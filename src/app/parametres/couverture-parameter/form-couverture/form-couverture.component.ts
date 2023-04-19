import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Branche } from "src/app/core/models/banche";
import { Couverture } from "src/app/core/models/couverture";
import { BrancheService } from "src/app/core/service/branche.service";
import { CouvertureService } from "src/app/core/service/couverture.service";
import { UtilitiesService } from "src/app/core/service/utilities.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-couverture',
  templateUrl: './form-couverture.component.html',
  styleUrls: ['./form-couverture.component.scss']
})
export class FormCouvertureComponent implements OnInit {

  paramForm!: FormGroup;
  @Input() itemToUpdate: Couverture; // Pour signifier la mofification de l'element
  busySuscription!: Subscription;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  listeBranches: Branche[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private couvertureService: CouvertureService,
    private brancheService: BrancheService,
    private utilities: UtilitiesService
  ) {}

  createForm = () => {
    this.paramForm = this.formBuilder.group({
      couId: [this.itemToUpdate?.couId || ""],
      couLibelle: [this.itemToUpdate?.couLibelle || "", Validators.required],
      couLibelleAbrege: [this.itemToUpdate?.couLibelleAbrege || "", Validators.required],
      branId: [
        this.itemToUpdate?.branId || "",
        Validators.required,
      ],
    });
    
  };

  getFormFiledsValue = (field: string) => {
    return this.paramForm.get(field);
  };

  getBranche() {
    this.brancheService.getAll().subscribe(
      (response : any) => {
        if(response.content) {
          this.listeBranches = response.content as Branche[];

          // Si nous sommes en modification relancer la fonction de patchValue pour avoir la branche
          if(this.itemToUpdate && this.itemToUpdate.couId) {
            this.createForm();
          }
        }else{
          this.listeBranches = [];
        }
      }
    )
  }

  confirmSaveItem() {
    Swal.fire({
      title: "Couverture",
      text: (this.itemToUpdate?.couId && this.itemToUpdate?.couId > 0)
        ? "Vous êtes sur le point de modifier une couverture. Voulez-vous poursuivre cette action ?"
        : "Vous êtes sur le point d'enregistrer une couverture. Voulez-vous poursuivre cette action ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0665aa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.saveItem(this.paramForm.value);
      }
    });
  }

  saveItem(item: Couverture) {
    let itemAEnregistrer = Object.assign({}, item);
    if (!itemAEnregistrer.couId) {
      // nous sommes au create
      this.couvertureService.create(itemAEnregistrer).subscribe((response : any) => {
        console.log(" response ", response);
        if (response && response.paysId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull,
            "bottom",
            "center"
          );
        }
        this.closeModal.emit(true);
      });
    } else {
      // Nous sommes en modification
      this.couvertureService.update(itemAEnregistrer).subscribe((response: any) => {
        console.log(" response ", response);
        if (response && response?.paysId) {
          this.utilities.showNotification(
            "snackbar-success",
            this.utilities.getMessageOperationSuccessFull,
            "bottom",
            "center"
          );
        }
        this.closeModal.emit(true);
      });
    }
  }

  ngOnInit(): void {
    // Initialisation du forms group
    this.createForm();
    this.getBranche();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["itemToUpdate"] && changes["itemToUpdate"].currentValue) {
      this.createForm();
    }
  }


}
