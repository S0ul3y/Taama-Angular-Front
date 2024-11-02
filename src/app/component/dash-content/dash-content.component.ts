import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProfileComponent } from "../profile/profile.component";
import { UtilisateurService } from '../../Services/utilisateur.service';
import { Utilisateur } from '../../Models/Utilisateur';
import { AdminAgence } from '../../Models/AdminAgence';
import { AdminComp } from '../../Models/AdminComp';
import { NgIf } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dash-content',
  standalone: true,
  imports: [ProfileComponent, NgIf],
  templateUrl: './dash-content.component.html',
  styleUrl: './dash-content.component.scss',
})
export class DashContentComponent {
  utilisateur: Utilisateur | null = null;
  adminAgence: AdminAgence | null = null;
  admincomp: AdminComp | null = null;
  role: string | null = null;
  NbrClient: any | null = null;
  NbrAgence: any | null = null;
  NbrReservation: any | null = null;
  // utilisateur: Utilisateur | null = null;

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.chart = new Chart(this.chartRef.nativeElement, this.config);
    this.chart2 = new Chart(this.chartRef2.nativeElement, this.configg);

    this.getCurrentUser();
    this.getNbreUser();
    this.getNbrAgence();
    this.getNbrReservation();
  }

  // Méthode pour récupérer la liste des admins (fonction à implémenter selon ta logique)
  getCurrentUser() {
    this.utilisateurService.getCurrentUser().subscribe({
      next: (data) => {
        this.utilisateur = data;
        if (this.utilisateur.role?.role === 'AdminA') {
          this.adminAgence = this.utilisateur;
        } else if (this.utilisateur.role?.role === 'AdminC') {
          this.admincomp = this.utilisateur;
        } else {
          this.role = 'Administrateur';
        }
        // console.log('Admins récupérés avec succès :', data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des admins :', err);
      },
    });
  }
  getNbreUser() {
    this.utilisateurService.getNbrClient().subscribe((data) => {
      this.NbrClient = data;
    });
  }
  getNbrAgence() {
    this.utilisateurService.getNbrAgence().subscribe((data) => {
      this.NbrAgence = data;
    });
  }

  getNbrReservation() {
    this.utilisateurService.getNbrReservation().subscribe((data) => {
      this.NbrReservation = data;
    });
  }

  @ViewChild('barChart', { static: true })
  chartRef!: ElementRef<HTMLCanvasElement>;
  chart: any;

  public config: any = {
    type: 'bar',
    data: {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(201, 203, 207, 0.8)',
          ],
          borderColor: ['rgba(0, 0, 0, 0)'],
          /*borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],*/
          borderWidth: 1,
          borderRadius: 10,
        },
      ],
    },
    options: {
      responsive: true, // Rend le graphique responsive
      maintainAspectRatio: false, // Permet au graphique de remplir son conteneur
      scales: {
        y: {
          display: false,
          beginAtZero: true,
          grid: {
            display: false, // Masque les lignes de la grille pour l'axe des ordonnées
          },
        },
        x: {
          // Configuration de l'axe des abscisses (X)
          grid: {
            display: false, // Masquer les lignes de la grille pour l'axe X
          },
          ticks: {
            font: {
              size: 14, // Taille de la police des étiquettes sur l'axe X
            },
            color: 'gray', // Couleur des étiquettes sur l'axe X
          },
        },
      },
      plugins: {
        legend: {
          display: false, // Masque la légende
        },
        tooltip: {
          callbacks: {
            label: function (context: any): any {
              return `${context.raw}`; // Affiche seulement la valeur numérique dans l'infobulle
            },
          },
        },
      },
    },
  };

  @ViewChild('pieChart', { static: true })
  chartRef2!: ElementRef<HTMLCanvasElement>;
  chart2: any;

  public configg: any = {
    type: 'doughnut',
    data: {
      labels: ['Niveau 1', 'Niveau 2', 'Niveau 3'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      cutout: '30%', // Définit la taille du trou intérieur (50% du diamètre total)
      radius: '80%', // Définit le rayon extérieur (taille totale du doughnut)
      responsive: true,
      maintainAspectRatio: false,
    },
  };
}
