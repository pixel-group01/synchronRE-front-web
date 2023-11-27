import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { AffaireService } from 'src/app/core/service/affaire.service';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';
import * as moment from 'moment';
import jspdf from 'jspdf'
import 'jspdf-autotable'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-data-sinistre-facultative',
  templateUrl: './data-sinistre-facultative.component.html',
  styleUrls: ['./data-sinistre-facultative.component.scss']
})
export class DataSinistreFacultativeComponent implements OnInit,AfterViewInit {
  listes: [1,2,3];
  maxDate = new Date();
  segments: any;
  segments1: any;
  segments2: any;
  segments3: any;
  segments4: any;
  segments5: any;
  detailsAffaireParCedantes :any =[];
  detailsAffaireParCessionnaires :any =[];
  items :any = {}
  exercices : any = [];
  cedantes : any =[];
  couvertures :any =[];
  devises :any = [];

    itemsExercices: any = [];
    itemsCedId: any = [];
    itemscesIds: any = [];
    itemsCouId: any = [];
    itemsEtatName: any = [];
    itemsAffId: any = [];
    itemsDevCode: any = [];
    itemsEffet: string ;
    itemsEcheance: string;
  etat : any= [{libelle : "REALISEE"},{libelle :"INSTANCE" },{libelle : "NON_REALISEE"}]
  constructor(private statiqueAffaireFacultatif : AffaireService) { }

  ngOnInit(): void {
    // this.getAffaireFacultatifStatistique();
    this.getAffExercice();
    this.getAffCedante();
    this.getAffCouverture();
    this.getAffDevises();
    // this.getAffStatut();
  }

  ngAfterViewInit() {
    this.getAffaireFacultatifStatistique()
    // this.testGraph();
    this.testGraph1();
    this.testGraph2();
    // this.testGraph3();
    this.testGraph4();
    this.testGraph5();
  }

  getAffaireFacultatifStatistique(exercices?:any,cedIds?:any,cesIds?:any,affIds?:any,statutCreation?:string,couIds?:any,devCodes?:any,dateEffet?:any,dateEcheance?:any){
    const data = {
        data :{
            "exercices": exercices,
              "cedIds": cedIds,
              "cesIds":  cesIds,
              "affIds": affIds,
              "statutCreation": statutCreation,
              //staCodes,
              "couIds": couIds,
              "devCodes": devCodes,
              "dateEffet": dateEffet,
              "dateEcheance": dateEcheance
        }
    }
    this.statiqueAffaireFacultatif.getAffaireFacultatifStatistique(data).subscribe((res:any)=>{
        // console.log("res statistique ::", res);
        if (res) {
            this.items = res;
            let tabSerieTestGraph : any =[]
            this.detailsAffaireParCedantes = res.detailsAffaireParCedantes;
            this.detailsAffaireParCessionnaires = res.detailsAffaireParCessionnaires;
            
            this.testGraph();
            this.testGraph3()
        }
    })
  }

  getAffExercice(){
  this.statiqueAffaireFacultatif.affaireStatistiquesExercices().subscribe((res:any)=>{
    if (res) {
    this.exercices = res
    }
    
  })
  }

  getAffCedante(){
    this.statiqueAffaireFacultatif.affaireStatistiquesCedantes().subscribe((res:any)=>{
        if (res) {
            this.cedantes = res.content
        }
      })
  }
  getAffCouverture(){
    this.statiqueAffaireFacultatif.affaireStatistiquesCouvertures().subscribe((res:any)=>{
        if (res) {
            this.couvertures = res.content
        }
      })
  }
  getAffDevises(){
    this.statiqueAffaireFacultatif.affaireStatistiquesDevises().subscribe((res:any)=>{
        if (res) {
            this.devises = res
        }
      })
  }

  getAffStatut(){
    this.statiqueAffaireFacultatif.affaireStatistiquesstatuts().subscribe((res:any)=>{
      })
  }

  downloadExcel() {
    let tableData = []
    // const header =  [['Cédantes','Total affaires','Total capital initial','Total smp/lci']];
    this.detailsAffaireParCedantes.map((item:any)=>{
        tableData.push([item.libelle,item.nbrAffaires,item.mtCapitalInitial,item.mtSmpLci])
    })

    tableData.unshift(["",this.items.nbrAffaires,this.items.mtTotalCapitalInitial || 0 , this.items.mtTotalSmpLci || 0])
    console.log('tableData :',tableData);

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Stat-Affaire-par-Cédante', {
      headerFooter: { oddFooter: "Page &P of &N", oddHeader: 'Odd Page' }
    });
    worksheet.columns = [
      { header: 'Liste des affaires par cédantes' + ' ' + moment(new Date()).format("DD/MM/YYYY"), key: 'col1' },
      { header: '', key: 'col2' },
      { header: '', key: 'col3' },
      { header: '', key: 'col4' },
      { header: '', key: 'col5' },
      
    ]
    const rows = worksheet.addRow([]);
    const row = worksheet.addRow(['Cédante', 'Total affaire','Total capital initial', 'Total smp/lci']);
    worksheet.mergeCells('A1:D1');

    let header = worksheet.columns.map((col: any) => {
      return col.header
    });

    worksheet.columns.forEach(column => {
      column.width = column.header.length < 22 ? 22 : column.header.length
    })
    
    for (let x1 of tableData) {
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    for (let i = 1; i <= tableData.length + 1; i++) {
      worksheet.getRow(i).font = { size: 9 };
    }
    worksheet.getRow(3).font = { size: 12 };

    let fname = "Stat-Affaire-par-Cédante"

    let nbre_1: number = tableData.length + 6;
    let nbre_2: number = tableData.length + 6;
    let celTotal: string = 'G' + nbre_1;
    let celNbreTotal: string = 'H' + nbre_2;

    // worksheet.getCell(celTotal).value = {
    //   'richText': [
    //     { 'font': { 'bold': false, 'size': 12, 'color': { 'theme': 1 }, 'name': 'Calibri', 'family': 2, 'scheme': 'minor' }, 'text': 'Total :' }
    //   ]
    // };
    // worksheet.getCell(celTotal).border = {
    //   top: { color: { argb: 'FF00FF00' } },
    //   left: { color: { argb: 'FF00FF00' } },
    //   bottom: { color: { argb: 'FF00FF00' } },
    //   right: { color: { argb: 'FF00FF00' } }
    // };
    // worksheet.getCell(celNbreTotal).value = {
    //   'richText': [
    //     { 'font': { 'bold': true, 'size': 10, 'color': { 'theme': 1 }, 'name': 'Calibri', 'family': 2, 'scheme': 'minor' }, 'text': this.detailsAffaireParCedantes.length }
    //   ]
    // };

    worksheet.getCell('A1').font = {
      name: 'Arial',
      family: 4,
      size: 16,
      underline: true,
      bold: true
    };

    worksheet.getCell('A1').border = {
   
    };
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.getCell('A3').fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' },
    };

    worksheet.getCell('B3').fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    };
    worksheet.getCell('C3').fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    };
    worksheet.getCell('D3').fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    };
   

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      fs.saveAs(blob, fname + '-' + '.xlsx');
    });

  }

  downloadPdf() {
    let tableData = []
    const header =  [['Cédantes','Total affaires','Total capital initial','Total smp/lci']];
    this.detailsAffaireParCedantes.map((item:any)=>{
        tableData.push([item.libelle,item.nbrAffaires,item.mtCapitalInitial,item.mtSmpLci])
    })

    tableData.unshift(["",this.items.nbrAffaires,this.items.mtTotalCapitalInitial || 0 , this.items.mtTotalSmpLci || 0])
    // console.log('tableData :',tableData);
    
    var pdf = new jspdf;
    pdf.setFontSize(12);
    const imageUrl = 'assets/images/nelson-Re.jpeg';

     // Obtention de la date d'aujourd'hui
     const aujourdHui = new Date();

    // Utilisation du service DatePipe pour formater la date
    const optionsDate = 'dd/MM/yyyy'; // ajustez le format selon vos besoins
    const texteDate = 'Date : '+ moment(aujourdHui).format("DD/MM/YYYY"); 

    pdf.addImage(imageUrl, 'JPEG', 10, 10, 30, 10);
    // Texte à aligner avec l'image

    // Texte à centrer
    const texte = 'STATISTIQUE DES AFFAIRES PAR CEDANTE';
    const texte2 = this.itemsExercices.length >0 ? `Exercice(s) : ${this.itemsExercices.join(', ')}` : "";

    // Couleur de fond pour le texte1 (par exemple, couleur jaune)
    const couleurFondTexte1 = [255, 255, 0];

    // Taille de la police (facultatif)
    const taillePolice = 12;
    pdf.setFontSize(taillePolice);
   

    // Largeur de la page
    const largeurPage = pdf.internal.pageSize.width;

    // Largeur du texte
    const largeurTexte = pdf.getStringUnitWidth(texte) * taillePolice / pdf.internal.scaleFactor;

    // Largeur du texte2
    const largeurTexte2 = pdf.getStringUnitWidth(texte2) * taillePolice / pdf.internal.scaleFactor;

    // Largeur du texte
    const largeurTexteDate = pdf.getStringUnitWidth(texteDate) * taillePolice / pdf.internal.scaleFactor;

    // Calcul de la position x pour centrer le texte
    const positionX = (largeurPage - largeurTexte) / 2;
    const positionX2 = 14;

    // Position y (vous pouvez ajuster cette valeur selon votre mise en page)
    const positionY = 30;

    const positionY2 = positionY + 10; // Augmentez la valeur pour décaler le texte vers le bas

    // Position x pour centrer le texte avec l'image
    const positionXDate = 167; // Ajustez la valeur en fonction de la position de votre image

    // Position y (vous pouvez ajuster cette valeur selon votre mise en page)
    const positionYDate = 18; // Ajustez la valeur en fonction de la position de votre image


    // Ajout du texte centré
    pdf.text(texte, positionX, positionY);
    const taillePoliceTexte2 = 10;
    // const policeBold = 'Helvetica-Bold';
    // pdf.setFont(policeBold);
    pdf.setFontSize(taillePoliceTexte2);
    pdf.text(texte2, positionX2, positionY2);  // Ajout du nouveau texte à la ligne suivante
    // Ajout du texte aligné avec l'image
    pdf.text(texteDate, positionXDate, positionYDate);

    // pdf.text('STATISTIQUE DES AFFAIRES PAR CEDANTE',30,30);
    const styles = { lineWidth: 0.1, lineColor: [0, 0, 0] }; 

    // Configuration spécifique à l'en-tête
    const headerStyles = {
        fillColor: [0, 0, 128], // Couleur bleu en RVB
        textColor: [255, 255, 255], // Couleur de texte blanc en RVB
    };


    (pdf as any).autoTable({
        head: header,
        body : tableData,
        theme : 'plain',
        startY: 50,// Ajoutez la marge supérieure ici
        styles: styles,// Ajustez la valeur pour changer l'épaisseur de la bordure
        headStyles: headerStyles, // Utilisation de headStyles pour spécifier les styles de l'en-tête
        
    })
    pdf.output('dataurlnewwindow'),
    pdf.save('affaire-par-cedantes.pdf')
  }

  calculerSomme(tableau) {
    var somme = 0;
    
    for (var i = 0; i < tableau.length; i++) {
        somme += tableau[i];
    }

    return somme;
}

  testGraph(){
    const options: any = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Affaires facultatives',
            align: 'center'
        },
        subtitle: {
            text: '',
            align: ''
        },
        xAxis: {
            categories: this.detailsAffaireParCedantes.map((res:any)=> {
                res.libel =  res.libelle;
                if (res.libelle == "NSIA Assurances Guinée Bissau") {
                    res.libel =  "NSIA GB"
                }
              return res.libel
                }),
                title: {
                    text: null
                },
                gridLineWidth: 1,
                lineWidth: 0.5
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            },
            gridLineWidth: 0
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                pointWidth: 18,
                borderRadius: '2px',
                // pointPadding: 0.1,
                // borderWidth: 5,
                width: 30,
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.1
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: 2,
            y: 40,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true,
            enabled:false,
        },
        credits: {
            enabled: false
        },
        series: [{
            name: `Nombre d'affaires : ${this.calculerSomme(this.detailsAffaireParCedantes.map((res:any)=> res.nbrAffaires))}`,
            // data: [1058625000,15]
            data: this.detailsAffaireParCedantes.map((res:any)=> res.nbrAffaires)
        }, {
            name: `SMP/LCI : ${this.calculerSomme(this.detailsAffaireParCedantes.map((res:any)=> res.mtSmpLci))}`,
            data: this.detailsAffaireParCedantes.map((res:any)=> res.mtSmpLci)
            // data: [6,1457852222]
        },
        
    ]
    }
    setTimeout(() => {
      this.segments = new Chart(options);
    },);
  }

  testGraph1(){
    const options: any = {
        
      chart: {
          type: 'column'
      },
      title: {
          text: 'Commissions'
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          type: 'category',
          labels: {
              rotation: -45,
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: ''
          }
      },
      legend: {
          enabled: false
      },
      tooltip: {
          pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>'
      },
      series: [{
          name: 'Population',
          colors: [
              '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
              '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
              '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
              '#03c69b',  '#00f194'
          ],
          colorByPoint: true,
          groupPadding: 0,
          data: [
              ['Tokyo', 37.33],
              ['Delhi', 31.18],
              ['Shanghai', 27.79],
              ['Sao Paulo', 22.23],
              ['Mexico City', 21.91],
              ['Dhaka', 21.74],
              ['Cairo', 21.32],
              ['Beijing', 20.89],
              ['Mumbai', 20.67],
              ['Osaka', 19.11],
              ['Karachi', 16.45],
              ['Chongqing', 16.38],
              ['Istanbul', 15.41],
              ['Buenos Aires', 15.25],
              ['Kolkata', 14.974],
              ['Kinshasa', 14.970],
              ['Lagos', 14.86],
              ['Manila', 14.16],
              ['Tianjin', 13.79],
              ['Guangzhou', 13.64]
          ],
          dataLabels: {
              enabled: true,
              rotation: -90,
              color: '#FFFFFF',
              align: 'right',
              format: '{point.y:.1f}', // one decimal
              y: 10, // 10 pixels down from the top
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
      }]
    }
    setTimeout(() => {
      this.segments1 = new Chart(options);
    },);
  }

  testGraph2(){
    const options: any = {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Primes'
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          type: 'category',
          labels: {
              rotation: -45,
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: ''
          }
      },
      legend: {
          enabled: false
      },
      tooltip: {
          pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>'
      },
      series: [{
          name: 'Population',
          colors: [
              '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
              '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
              '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
              '#03c69b',  '#00f194'
          ],
          colorByPoint: true,
          groupPadding: 0,
          data: [
              ['Tokyo', 37.33],
              ['Delhi', 31.18],
              ['Shanghai', 27.79],
              ['Sao Paulo', 22.23],
              ['Mexico City', 21.91],
              ['Dhaka', 21.74],
              ['Cairo', 21.32],
              ['Beijing', 20.89],
              ['Mumbai', 20.67],
              ['Osaka', 19.11],
              ['Karachi', 16.45],
              ['Chongqing', 16.38],
              ['Istanbul', 15.41],
              ['Buenos Aires', 15.25],
              ['Kolkata', 14.974],
              ['Kinshasa', 14.970],
              ['Lagos', 14.86],
              ['Manila', 14.16],
              ['Tianjin', 13.79],
              ['Guangzhou', 13.64]
          ],
          dataLabels: {
              enabled: true,
              rotation: -90,
              color: '#FFFFFF',
              align: 'right',
              format: '{point.y:.1f}', // one decimal
              y: 10, // 10 pixels down from the top
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
      }]
    }
    setTimeout(() => {
      this.segments3 = new Chart(options);
    },);
  }

  testGraph3(){
    const options: any = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Affaires facultatives',
            align: 'center'
        },
        subtitle: {
            text: '',
            align: ''
        },
        xAxis: {
            categories: this.detailsAffaireParCessionnaires.map((res:any)=> {
                res.libel =  res.libelle;

                if (res.libelle == "SCA INTER A RE SOLUTION RE") {
                    res.libel =  "SCA INTER"
                }
              return res.libel
            }),
            title: {
                text: null
            },
            gridLineWidth: 1,
            lineWidth: 0.5
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            },
            gridLineWidth: 0
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                pointWidth: 18,
                borderRadius: '2px',
                width: 30 ,
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.1
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: 2,
            y: 40,
            enabled:false,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: `Nombre d'affaires : ${this.calculerSomme(this.detailsAffaireParCessionnaires.map((res:any)=> res.nbrAffaires))}`,
            data: this.detailsAffaireParCessionnaires.map((res:any)=> res.nbrAffaires)
        }, {
            name: `SMP/LCI : ${this.calculerSomme(this.detailsAffaireParCessionnaires.map((res:any)=> res.mtSmpLciAccepte))}`,
            data: this.detailsAffaireParCessionnaires.map((res:any)=> res.mtSmpLciAccepte)
        }]
    }
    setTimeout(() => {
      this.segments4 = new Chart(options);
    },);
  }

  testGraph4(){
    const options: any = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Affaires facultatives'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>'
        },
        series: [{
            name: 'Population',
            colors: [
                '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                '#03c69b',  '#00f194'
            ],
            colorByPoint: true,
            groupPadding: 0,
            data: [
                ['Tokyo', 37.33],
                ['Delhi', 31.18],
                ['Shanghai', 27.79],
                ['Sao Paulo', 22.23],
                ['Mexico City', 21.91],
                ['Dhaka', 21.74],
                ['Cairo', 21.32],
                ['Beijing', 20.89],
                ['Mumbai', 20.67],
                ['Osaka', 19.11],
                ['Karachi', 16.45],
                ['Chongqing', 16.38],
                ['Istanbul', 15.41],
                ['Buenos Aires', 15.25],
                ['Kolkata', 14.974],
                ['Kinshasa', 14.970],
                ['Lagos', 14.86],
                ['Manila', 14.16],
                ['Tianjin', 13.79],
                ['Guangzhou', 13.64]
            ],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
      }
    setTimeout(() => {
      this.segments3 = new Chart(options);
    },);
  }

  testGraph5(){
    const options: any = {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Primes'
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          type: 'category',
          labels: {
              rotation: -45,
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: ''
          }
      },
      legend: {
          enabled: false
      },
      tooltip: {
          pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>'
      },
      series: [{
          name: 'Population',
          colors: [
              '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
              '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
              '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
              '#03c69b',  '#00f194'
          ],
          colorByPoint: true,
          groupPadding: 0,
          data: [
              ['Tokyo', 37.33],
              ['Delhi', 31.18],
              ['Shanghai', 27.79],
              ['Sao Paulo', 22.23],
              ['Mexico City', 21.91],
              ['Dhaka', 21.74],
              ['Cairo', 21.32],
              ['Beijing', 20.89],
              ['Mumbai', 20.67],
              ['Osaka', 19.11],
              ['Karachi', 16.45],
              ['Chongqing', 16.38],
              ['Istanbul', 15.41],
              ['Buenos Aires', 15.25],
              ['Kolkata', 14.974],
              ['Kinshasa', 14.970],
              ['Lagos', 14.86],
              ['Manila', 14.16],
              ['Tianjin', 13.79],
              ['Guangzhou', 13.64]
          ],
          dataLabels: {
              enabled: true,
              rotation: -90,
              color: '#FFFFFF',
              align: 'right',
              format: '{point.y:.1f}', // one decimal
              y: 10, // 10 pixels down from the top
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
      }]
    }
    setTimeout(() => {
      this.segments5 = new Chart(options);
    },);
  }



}
