import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilisateurService } from '../../Services/utilisateur.service';
import { Utilisateur } from '../../Models/Utilisateur';
import Swal from 'sweetalert2';
import { AdminComp } from '../../Models/AdminComp';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-admin-compagnie',
  standalone: true,
  imports: [
    SidebarComponent,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    ProfileComponent,
  ],
  templateUrl: './admin-compagnie.component.html',
  styleUrls: ['./admin-compagnie.component.scss'], // Correction de styleUrl en styleUrls
})
export class AdminCompagnieComponent {
  visible = false;
  AdminForm!: FormGroup;
  edit: boolean = false;
  currentUserId?: number | null = null;
  utilisateur: Utilisateur[] = [];
  adminComp: AdminComp[] = [];
  // bloquer = true;

  constructor(
    private utilisateurService: UtilisateurService,
    private formbuilder: FormBuilder
  ) {
    this.AdminForm = this.formbuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]], // Correction de "prnom" à "prenom"
      username: ['', [Validators.required]],
      telephone: ['', [Validators.required]], // Correction de "telehone" à "telephone"
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAdmin();
  }

  // Méthode pour récupérer la liste des admins (fonction à implémenter selon ta logique)
  getAdmin() {
    this.utilisateurService.getAdminC().subscribe({
      next: (data) => {
        this.adminComp = data.map((utilisateur: any) => {
          return {
            ...utilisateur,
            bloquer: utilisateur.statut === 'Bloque',
          };
        });
        console.log('Admins récupérés avec succès :', data);
        // Ajoute ici la logique pour mettre à jour la liste des admins
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des admins :', err);
      },
    });
  }

  onSubmit(): void {
    if (this.edit && this.currentUserId !== null) {
      this.updateAdmin();
    } else {
      this.AddAdmin();
      this.getAdmin(); // Rafraîchit la liste des admins après ajout
    }
  }

  // Bloquer Admin Compagnie

  bloquer(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez vous effectuer cette action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, bloqué-le !',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.utilisateurService.activerAdminC(id).subscribe({
          next: () => {
            Swal.fire('Cet admin a été bloqué avec succès');
            this.getAdmin(); // Rafraîchit la liste des admins après suppression
          },
          error: (err) => {
            console.error('Erreur lors du bloquage', err);
            this.getAdmin();
            // Swal.fire(
            //   'Erreur',
            //   "Impossible de supprimer l'utilisateur.",
            //   'error'
            // );
          },
        });
      }
    });
  }

  // Méthode pour ajouter un nouvel admin
  AddAdmin() {
    if (this.AdminForm.valid) {
      const nouveauAdmin: Utilisateur = {
        nom: this.AdminForm.get('nom')?.value,
        prenom: this.AdminForm.get('prenom')?.value, // Correction de "prnom" à "prenom"
        username: this.AdminForm.get('username')?.value,
        telephone: this.AdminForm.get('telephone')?.value, // Correction de "telehone" à "telephone"
        password: this.AdminForm.get('password')?.value,
        id: 0, // L'ID sera généré par le backend
      };

      this.utilisateurService.ajouterAdminC(nouveauAdmin).subscribe({
        next: (res) => {
          console.log('Admin ajouté avec succès :', res);
          this.getAdmin(); // Rafraîchit la liste des admins après l'ajout
          this.AdminForm.reset();
          this.visible = false; // Réinitialise le formulaire
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout de l'admin :", err);
        },
      });
    } else {
      console.error('Le formulaire est invalide');
    }
  }

  // Méthode pour mettre à jour un admin existant
  updateAdmin(): void {
    if (this.currentUserId != null && this.AdminForm.valid) {
      const updatedAdmin: Utilisateur = {
        id: this.currentUserId,
        nom: this.AdminForm.get('nom')?.value,
        prenom: this.AdminForm.get('prenom')?.value,
        username: this.AdminForm.get('username')?.value,
        telephone: this.AdminForm.get('telephone')?.value,
        password: this.AdminForm.get('password')?.value,
      };

      this.utilisateurService
        .modifierAdminC(this.currentUserId, updatedAdmin)
        .subscribe({
          next: (res) => {
            console.log('Admin mis à jour avec succès :', res);
            this.getAdmin(); // Rafraîchit la liste des admins après la mise à jour
            this.AdminForm.reset();
            this.edit = false;
            this.currentUserId = null;
          },
          error: (err) => {
            console.error("Erreur lors de la mise à jour de l'admin :", err);
          },
        });
    }
  }

  // Méthode pour éditer un admin (pré-remplir le formulaire pour mise à jour)
  editAdmin(utilisateur: Utilisateur): void {
    this.edit = true;
    this.visible = true;
    this.currentUserId = utilisateur.id;
    this.AdminForm.patchValue({
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      username: utilisateur.username,
      telephone: utilisateur.telephone,
      password: '', // Ne pas pré-remplir le mot de passe pour des raisons de sécurité
    });
  }

  // Méthode pour supprimer un admin
  deleteUser(id: number): void {
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
        this.utilisateurService.supprimerAdminC(id).subscribe({
          next: () => {
            Swal.fire('Supprimé!', "L'utilisateur a été supprimé.", 'success');
            this.getAdmin(); // Rafraîchit la liste des admins après suppression
          },
          error: (err) => {
            console.error("Erreur lors de la suppression de l'admin :", err);
            Swal.fire(
              'Erreur',
              "Impossible de supprimer l'utilisateur.",
              'error'
            );
          },
        });
      }
    });
  }

  // Méthodes pour afficher ou cacher le formulaire
  afficher() {
    this.visible = true;
  }

  cacher() {
    this.visible = false;
  }
}
