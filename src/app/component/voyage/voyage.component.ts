import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RechercheComponent } from "../recherche/recherche.component";
import { jour, ville, Voyage } from '../../Models/Voyage';
import { CrudServiceService } from '../../Services/CrudService';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VoyageService } from '../../Services/voyage-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProfileComponent } from "../profile/profile.component";
import { AuthServiceService } from '../../Services/auth-service.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-voyage',
  standalone: true,
  imports: [
    SidebarComponent,
    NgIf,
    NgFor,
    RechercheComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileComponent,
  ],
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.scss'],
})
export class VoyageComponent implements OnInit {
  visible = false;
  VoyageForm!: FormGroup;
  voyages: Voyage[] = [];
  jours: jour[] = [];
  villes: ville[] = [];
  currentUserId?: number | null = null;
  edit = false;
  role: string | null = null;

  constructor(
    private voyageService: VoyageService,
    private formbuilder: FormBuilder,
    private authService: AuthServiceService
  ) {
    this.VoyageForm = this.formbuilder.group({
      v_depart: ['', [Validators.required]],
      v_arrivee: ['', [Validators.required]],
      jour: ['', [Validators.required]],
      heure: ['', [Validators.required]],
      prix: [null, [Validators.required]],
      nbr_place: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.authService.userRole$.subscribe((role) => {
      this.role = localStorage.getItem('userRole');
      console.log('je suis admin sidebar', this.role);
    });

    this.getVoyages();
    this.getjour();
    this.getville();
  }

  getVoyages(): void {
    this.voyageService.getVoyages().subscribe({
      next: (data) => {
        console.log(data);
        this.voyages = data.map((voyage: any) => {
          return {
            ...voyage,
            bloquer: voyage.statut === 'Bloque',
          };
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des voyages : ', err);
      },
    });
  }

  Onsubmit() {
    if (this.edit === true) {
      this.updateVoyage();
    } else {
      this.ajouterVoyage();
    }
  }

  // Ajouter Voyage =================================================================================================
  ajouterVoyage(): void {
    if (this.VoyageForm.valid) {
      const nouveauVoyage: Voyage = {
        ville_depart: this.VoyageForm.get('v_depart')?.value,
        ville_arrivee: this.VoyageForm.get('v_arrivee')?.value,
        jour: this.VoyageForm.get('jour')?.value,
        heure: this.VoyageForm.get('heure')?.value,
        prix: this.VoyageForm.get('prix')?.value,
        nbr_place: this.VoyageForm.get('nbr_place')?.value,
      };

      this.voyageService.ajouterVoyage(nouveauVoyage).subscribe({
        next: (res) => {
          console.log('Voyage ajouté avec succès !', res);
          this.getVoyages(); // Rafraîchit la liste des voyages après l'ajout
          this.VoyageForm.reset();
          this.visible = false; // Réinitialise le formulaire
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout du voyage : ", err);
        },
      });
    } else {
      console.error('Le formulaire est invalide');
    }
  }

  // Méthode pour éditer un admin (pré-remplir le formulaire pour mise à jour)
  editVoyage(voyage: Voyage): void {
    this.edit = true;
    this.visible = true;
    this.currentUserId = voyage.id;
    this.VoyageForm.patchValue({
      // ...voyage,
      v_depart: voyage.ville_depart,
      v_arrivee: voyage.ville_arrivee,
      jour: voyage.jour,
      heure: voyage.heure,
      prix: voyage.prix,
      nbr_place: voyage.nbr_place, // Ne pas pré-remplir le mot de passe pour des raisons de sécurité
    });
  }

  // Méthode pour mettre à jour un admin existant
  updateVoyage(): void {
    if (this.currentUserId != null && this.VoyageForm.valid) {
      const updatedVoyage: Voyage = {
        id: this.currentUserId,
        ville_depart: this.VoyageForm.get('v_depart')?.value,
        ville_arrivee: this.VoyageForm.get('v_arrivee')?.value,
        jour: this.VoyageForm.get('jour')?.value,
        heure: this.VoyageForm.get('heure')?.value,
        prix: this.VoyageForm.get('prix')?.value,
        nbr_place: this.VoyageForm.get('nbr_place')?.value,
      };

      this.voyageService
        .modifierVoyage(this.currentUserId, updatedVoyage)
        .subscribe({
          next: (res) => {
            console.log('Admin mis à jour avec succès :', res);
            this.getVoyages(); // Rafraîchit la liste des admins après la mise à jour
            this.VoyageForm.reset();
            this.edit = false;
            this.currentUserId = null;
            this.visible = false;
          },
          error: (err) => {
            console.error("Erreur lors de la mise à jour de l'admin :", err);
          },
        });
    }
  }

  // Supprimer voyage

  deleteVoyage(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas annuler cette action !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.voyageService.supprimerVoyage(id).subscribe({
          next: () => {
            Swal.fire('Supprimé!', 'le voyage a été supprimé.', 'success');
            this.getVoyages(); // Rafraîchit la liste des admins après suppression
          },
          error: (err) => {
            console.error('Erreur lors de la suppression du voyage :', err);
            Swal.fire('Erreur', 'Impossible de supprimer le voyage.', 'error');
          },
        });
      }
    });
  }

  getjour(): void {
    this.voyageService.getjour().subscribe({
      next: (data) => {
        console.log(data);
        this.jours = data; // Met à jour la liste des voyages
      },
    });
  }
  getville(): void {
    this.voyageService.getville().subscribe({
      next: (data) => {
        console.log(data);
        this.villes = data; // Met à jour la liste des voyages
      },
    });
  }

  afficher() {
    this.visible = true;
  }
  cacher() {
    this.visible = false;
    this.edit = false;
    this.VoyageForm.reset();
  }
}
