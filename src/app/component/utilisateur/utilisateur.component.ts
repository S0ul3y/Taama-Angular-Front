import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NgFor, NgIf } from '@angular/common';
import { Utilisateur } from '../../Models/Utilisateur';
import { UtilisateurService } from '../../Services/utilisateur.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [SidebarComponent, NgIf, NgFor, ProfileComponent],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.scss',
})
export class UtilisateurComponent {
  visible = false;
  utilisateur: Utilisateur[] = [];

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.getAdmin();
  }

  // Méthode pour récupérer la liste des admins (fonction à implémenter selon ta logique)
  getAdmin() {
    this.utilisateurService.getClient().subscribe({
      next: (data) => {
        this.utilisateur = data.map((utilisateur: any) => {
          return {
            ...utilisateur,
            bloquer: utilisateur.statut === 'Bloque',
          };
        });
        console.log('Client récupérés avec succès :', data);
        // Ajoute ici la logique pour mettre à jour la liste des admins
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des clients :', err);
      },
    });
  }

  afficher() {
    this.visible = true;
  }
  cacher() {
    this.visible = false;
  }
}
