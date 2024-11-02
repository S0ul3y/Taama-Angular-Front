import { Component } from '@angular/core';
import { UtilisateurService } from '../../Services/utilisateur.service';
import { Utilisateur } from '../../Models/Utilisateur';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {

  utilisateur : Utilisateur | null = null;

  constructor(
    private utilisateurService: UtilisateurService,
  ) {
   
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  // Méthode pour récupérer la liste des admins (fonction à implémenter selon ta logique)
  getCurrentUser() {
    this.utilisateurService.getCurrentUser().subscribe({
      next: (data) => {
        this.utilisateur = data;
        // console.log('Admins récupérés avec succès :', data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des admins :', err);
      },
    });
  }
}
