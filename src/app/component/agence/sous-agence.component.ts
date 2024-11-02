import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompagnieService } from '../../Services/compagnie.service';
import { Utilisateur } from '../../Models/Utilisateur';
import { Compagnie } from '../../Models/Compagnie';
import { AdminComp } from '../../Models/AdminComp';
import { Agence } from '../../Models/Agence';
import { AgenceService } from '../../Services/agence.service';
import { AdminAgence } from '../../Models/AdminAgence';
import { VoyageService } from '../../Services/voyage-service.service';
import { ville } from '../../Models/Voyage';
import { RechercheComponent } from '../recherche/recherche.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-sous-agence',
  standalone: true,
  imports: [
    RechercheComponent,
    SidebarComponent,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    ProfileComponent,
  ],
  templateUrl: './sous-agence.component.html',
  styleUrl: './sous-agence.component.scss',
})
export class SousAgenceComponent {
  visible = false;
  Modif = false;
  AdminForm!: FormGroup;
  currentStep: number = 1;
  edit: boolean = false;
  currentUserId?: number | null = null;
  erreur: String = '';
  utilisateur: Utilisateur[] = [];
  Agence: Agence[] = [];
  villes: ville[] = [];
  // bloquer = false;

  constructor(
    private agenceService: AgenceService,
    private formbuilder: FormBuilder,

    private voyageService: VoyageService
  ) {
    this.AdminForm = this.formbuilder.group({
      // Utilisateur information

      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]], // Correction de "prnom" à "prenom"
      username: ['', [Validators.required]],
      telephone: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ], // Correction de "telehone" à "telephone"
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(8)],
      ],

      // Compagnie informations

      nomCompagnie: ['', Validators.required],
      ville: ['', Validators.required],
      // adresseCompagnie: ['', Validators.required],
      // emailCompagnie: ['', Validators.required],
      // telephoneCompagnie: ['', Validators.required],
    });
  }

  goToNextStep() {
    if (this.currentStep === 1 && this.AdminForm.get('nom')?.valid) {
      this.currentStep++;
      this.erreur = '';
    } else {
      this.erreur = 'Remplissez les champs';
    }
  }

  // Revenir à l'étape précédente
  goToPreviousStep() {
    this.erreur = '';
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  ngOnInit(): void {
    this.getCompagnie();
    this.getville();
  }

  // Méthode pour récupérer la liste des admins (fonction à implémenter selon ta logique)
  getCompagnie() {
    this.agenceService.getAgence().subscribe({
      next: (data) => {
        // On récupère la liste des compagnies et on ajoute la propriété `bloquer` à chaque compagnie
        this.Agence = data.map((compagnie: any) => {
          return {
            ...compagnie,
            bloquer: compagnie.statut === 'Bloque', // Si le statut est 'Bloqué', on définit bloquer à true
          };
        });

        console.log('Compagnies récupérées avec succès :', this.Agence);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des compagnies :', err);
      },
    });
  }

  // onSubmit(): void {
  //   if (this.edit && this.currentUserId !== null) {
  //     this.updateAdmin();
  //   } else {
  //     // this.AddAdmin();
  //     this.getAdmin(); // Rafraîchit la liste des admins après ajout
  //   }
  // }

  //Méthode pour ajouter un nouvel admin
  AddAgence() {
    if (this.AdminForm.valid) {
      const adminAgence: AdminAgence = {
        nom: this.AdminForm.get('nom')?.value,
        prenom: this.AdminForm.get('prenom')?.value, // Correction de "prnom" à "prenom"
        username: this.AdminForm.get('username')?.value,
        telephone: this.AdminForm.get('telephone')?.value, // Correction de "telehone" à "telephone"
        password: this.AdminForm.get('password')?.value,
        // id: 0, // L'ID sera généré par le backend
      };
      const NewAgence: Agence = {
        nom: this.AdminForm.get('nomCompagnie')?.value,
        region: this.AdminForm.get('ville')?.value,
        adminAgence: adminAgence, // L'ID sera généré par le backend
      };

      this.agenceService.ajouterAgence(NewAgence).subscribe({
        next: (res) => {
          console.log('Compagnie ajouté avec succès :', res);
          this.getCompagnie(); // Rafraîchit la liste des admins après l'ajout
          this.AdminForm.reset();
          this.visible = false; // Réinitialise le formulaire
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout de la compagnie :", err);
          this.getCompagnie(); // Rafraîchit la liste des admins après l'ajout
          this.AdminForm.reset();
          this.visible = false;
        },
      });
    } else {
      console.error('Le formulaire est invalide');
    }
    // this.visible = false;
    this.getCompagnie();
  }

  // Méthode pour éditer un admin (pré-remplir le formulaire pour mise à jour)
  editCompagnie(compagnie: Agence): void {
    this.edit = true;
    this.Modif = true;
    this.currentUserId = compagnie.id;
    this.AdminForm.patchValue({
      nomCompagnie: compagnie.nom,
      ville: compagnie.region,
      // username: utilisateur.username,
      // telephone: utilisateur.telephone,
      // password: '', // Ne pas pré-remplir le mot de passe pour des raisons de sécurité
    });
  }

  // Méthode pour mettre à jour un admin existant
  updateCompagnie(): void {
    if (this.currentUserId != null) {
      const agence: Agence = {
        // id: this.currentUserId,
        nom: this.AdminForm.get('nomCompagnie')?.value,
        region: this.AdminForm.get('ville')?.value,
        // prenom: this.AdminForm.get('prenom')?.value,
        // username: this.AdminForm.get('username')?.value,
        // telephone: this.AdminForm.get('telephone')?.value,
        // password: this.AdminForm.get('password')?.value,
      };

      this.agenceService.modifierAgence(this.currentUserId, agence).subscribe({
        next: (res) => {
          console.log('Compagnie mis à jour avec succès :', res);
          this.getCompagnie(); // Rafraîchit la liste des admins après la mise à jour
          this.AdminForm.reset();
          this.edit = false;
          this.Modif = false;
          this.currentUserId = null;
        },
        error: (err) => {
          console.error("Erreur lors de la mise à jour de l'admin :", err);
        },
      });
    }
  }

  // Méthode pour supprimer un admin
  // deleteUser(id: number): void {
  //   Swal.fire({
  //     title: 'Êtes-vous sûr ?',
  //     text: 'Vous ne pourrez pas annuler cette action !',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Oui, supprimez-le !',
  //     cancelButtonText: 'Annuler',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.utilisateurService.supprimerAdminC(id).subscribe({
  //         next: () => {
  //           Swal.fire('Supprimé!', "L'utilisateur a été supprimé.", 'success');
  //           this.getAdmin(); // Rafraîchit la liste des admins après suppression
  //         },
  //         error: (err) => {
  //           console.error("Erreur lors de la suppression de l'admin :", err);
  //           Swal.fire(
  //             'Erreur',
  //             "Impossible de supprimer l'utilisateur.",
  //             'error'
  //           );
  //         },
  //       });
  //     }
  //   });
  // }

  getville(): void {
    this.voyageService.getville().subscribe({
      next: (data) => {
        console.log(data);
        this.villes = data; // Met à jour la liste des voyages
      },
    });
  }

  // Méthodes pour afficher ou cacher le formulaire
  afficher() {
    this.visible = true;
  }

  cacher() {
    this.visible = false;
    this.erreur = '';
    this.currentStep = 1;
  }
  ShowModif() {
    this.Modif = true;
  }

  HideModif() {
    this.Modif = false;
    this.erreur = '';
    this.currentStep = 1;
  }
}

