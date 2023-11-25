import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { AffaireService } from 'src/app/core/service/affaire.service';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';
import * as moment from 'moment';

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
  etat : any= [{libelle : "REALISEE"},{libelle :"INSTANCE" },{libelle : "NON_REALISEE"}]
  constructor(private statiqueAffaireFacultatif : AffaireService) { }

  ngOnInit(): void {
    this.getAffaireFacultatifStatistique();
    this.getAffExercice();
    this.getAffCedante();
    this.getAffCouverture();
    this.getAffDevises();
    this.getAffStatut();
  }

  ngAfterViewInit() {
    this.testGraph();
    this.testGraph1();
    this.testGraph2();
    this.testGraph3();
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
            //   "staCodes": ,
              "couIds": couIds,
              "devCodes": devCodes,
              "dateEffet": dateEffet,
              "dateEcheance": dateEcheance
        }
    }
    this.statiqueAffaireFacultatif.getAffaireFacultatifStatistique(data).subscribe((res:any)=>{
        console.log("res statistique ::", res);
        if (res) {
            this.items = res
            this.detailsAffaireParCedantes = res.detailsAffaireParCedantes
            this.detailsAffaireParCessionnaires = res.detailsAffaireParCessionnaires 
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
    const row = worksheet.addRow(['Cédante', 'Nombres affaires', 'SMP/LCI']);
    worksheet.mergeCells('A1:C1');

    let header = worksheet.columns.map((col: any) => {
      return col.header
    });

    worksheet.columns.forEach(column => {
      column.width = column.header.length < 22 ? 22 : column.header.length
    })
    
    for (let x1 of this.detailsAffaireParCedantes) {
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    for (let i = 1; i <= this.detailsAffaireParCedantes.length + 1; i++) {
      worksheet.getRow(i).font = { size: 9 };
    }
    worksheet.getRow(3).font = { size: 12 };

    let fname = "Stat-Affaire-par-Cédante"

    let nbre_1: number = this.detailsAffaireParCedantes.length + 6;
    let nbre_2: number = this.detailsAffaireParCedantes.length + 6;
    let celTotal: string = 'G' + nbre_1;
    let celNbreTotal: string = 'H' + nbre_2;

    worksheet.getCell(celTotal).value = {
      'richText': [
        { 'font': { 'bold': false, 'size': 12, 'color': { 'theme': 1 }, 'name': 'Calibri', 'family': 2, 'scheme': 'minor' }, 'text': 'Total :' }
      ]
    };
    worksheet.getCell(celTotal).border = {
      top: { color: { argb: 'FF00FF00' } },
      left: { color: { argb: 'FF00FF00' } },
      bottom: { color: { argb: 'FF00FF00' } },
      right: { color: { argb: 'FF00FF00' } }
    };
    worksheet.getCell(celNbreTotal).value = {
      'richText': [
        { 'font': { 'bold': true, 'size': 10, 'color': { 'theme': 1 }, 'name': 'Calibri', 'family': 2, 'scheme': 'minor' }, 'text': this.detailsAffaireParCedantes.length }
      ]
    };

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
    worksheet.getCell('E3').fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    };
    worksheet.getCell('F3').fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    };
    worksheet.getCell('G3').fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    };
    worksheet.getCell('H3').fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    };

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      fs.saveAs(blob, fname + '-' + 'Jean-Luc' + '.xlsx');
    });

  }

  downloadPdf() {
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
    const row = worksheet.addRow(['Cédante', 'Nombres affaires', 'SMP/LCI']);
    worksheet.mergeCells('A1:C1');

    let header = worksheet.columns.map((col: any) => {
      return col.header
    });

    worksheet.columns.forEach(column => {
      column.width = column.header.length < 22 ? 22 : column.header.length
    })
    
    for (let x1 of this.detailsAffaireParCedantes) {
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    for (let i = 1; i <= this.detailsAffaireParCedantes.length + 1; i++) {
      worksheet.getRow(i).font = { size: 9 };
    }
    worksheet.getRow(3).font = { size: 12 };

    let fname = "Stat-Affaire-par-Cédante"

    let nbre_1: number = this.detailsAffaireParCedantes.length + 6;
    let nbre_2: number = this.detailsAffaireParCedantes.length + 6;
    let celTotal: string = 'G' + nbre_1;
    let celNbreTotal: string = 'H' + nbre_2;

    worksheet.getCell(celTotal).value = {
      'richText': [
        { 'font': { 'bold': false, 'size': 12, 'color': { 'theme': 1 }, 'name': 'Calibri', 'family': 2, 'scheme': 'minor' }, 'text': 'Total :' }
      ]
    };
    worksheet.getCell(celTotal).border = {
      top: { color: { argb: 'FF00FF00' } },
      left: { color: { argb: 'FF00FF00' } },
      bottom: { color: { argb: 'FF00FF00' } },
      right: { color: { argb: 'FF00FF00' } }
    };
    worksheet.getCell(celNbreTotal).value = {
      'richText': [
        { 'font': { 'bold': true, 'size': 10, 'color': { 'theme': 1 }, 'name': 'Calibri', 'family': 2, 'scheme': 'minor' }, 'text': this.detailsAffaireParCedantes.length }
      ]
    };

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
    worksheet.getCell('E3').fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    };
    worksheet.getCell('F3').fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    };
    worksheet.getCell('G3').fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    };
    worksheet.getCell('H3').fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    };

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/pdf' });
      fs.saveAs(blob, fname + '-' + 'Jean-Luc' + '.pdf');
    });

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
            categories: ['Africa', 'America', 'Asia', 'Europe'],
            title: {
                text: null
            },
            gridLineWidth: 1,
            lineWidth: 0
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population (millions)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            },
            gridLineWidth: 0
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                borderRadius: '8px',
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
            x: -40,
            y: 80,
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
            name: 'Year 1990',
            data: [631, 727, 3202, 721]
        }, {
            name: 'Year 2000',
            data: [814, 841, 3714, 726]
        }, {
            name: 'Year 2018',
            data: [1276, 1007, 4561, 746]
        }]
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
      this.segments2 = new Chart(options);
    },);
  }

  testGraph4(){
    const options: any = {
      chart: {
          type: 'column'
      },
      title: {
          text: 'commissions'
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
      this.segments4 = new Chart(options);
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
