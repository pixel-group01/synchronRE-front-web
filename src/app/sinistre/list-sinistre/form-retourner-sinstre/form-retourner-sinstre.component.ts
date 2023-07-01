import { Component, OnInit } from '@angular/core';
import { SinistreService } from 'src/app/core/service/sinistre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-retourner-sinstre',
  templateUrl: './form-retourner-sinstre.component.html',
  styleUrls: ['./form-retourner-sinstre.component.scss']
})
export class FormRetournerSinstreComponent implements OnInit {

  constructor(private sinistreService: SinistreService) { }

  ngOnInit(): void {
  }

  confirmRetournerSinistre() {
    Swal.fire({
      title: "Retourner un sinistre",
      text:"Vous êtes sur le point de retourner un sinistre. Voulez-vous poursuivre cette action ?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        // On effectue une transmission de sinistre
        this.retournerSinistre();
      }
    });
  }
  retournerSinistre(item?: any) {
    const data = {
      id: item.sinId,
      mvtObservation: item.description
    }
    this.sinistreService.retourner(data).subscribe((res: any) => {
      if (res) {
        console.log('ok pour mon form de retouner');
        
      }
    })
  }
}
