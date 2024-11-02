import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RechercheComponent } from "../recherche/recherche.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CrudServiceService } from '../../Services/CrudService';
import { Voyage } from '../../Models/Voyage';
import { VoyageService } from '../../Services/voyage-service.service';
import { ReservationService } from '../../Services/reservation.service';
import { Reservation } from '../../Models/Reservation';
import html2canvas from 'html2canvas';
import { AuthServiceService } from '../../Services/auth-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../Models/Client';
import { ProfileComponent } from "../profile/profile.component";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    SidebarComponent,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    RechercheComponent,
    ProfileComponent
],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent {
  role: string | null = null;
  lundi = true;
  mardi = false;
  mercredi = false;
  jeudi = false;
  vendredi = false;
  samedi = false;
  dimanche = false;

  visible = false;
  liste = false;
  billet = false;

  voyageId: number = 0;
  voyages: Voyage[] = [];
  allVoyages: Voyage[] = []; // Pour stocker tous les voyages
  reservation: Reservation[] = []; // Pour stocker tous les voyages
  BilletAffiche: Reservation | null = null; // Pour stocker tous les voyages

  ReservForm!: FormGroup;
  IdVoyage?: number | null = null;
  jourVoyage: string | null = null;
  datesDisponibles: string[] = [];

  jour = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];
  // voyageId: number = 0;
  // voyages: Voyage[] = [];

  constructor(
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private crudService: CrudServiceService,
    private voyageService: VoyageService,
    private form: FormBuilder,
    private reservationService: ReservationService // private location: Location
  ) {
    this.ReservForm = this.form.group({
      Nom: ['', [Validators.required]],
      Prenom: ['', [Validators.required]],
      DateVoyage: ['', [Validators.required]],
      telephone: [
        ,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
    });
  }

  ngOnInit() {
    this.authService.userRole$.subscribe((role) => {
      this.role = localStorage.getItem('userRole');
      console.log('je suis admin sidebar', this.role);
    });
    this.voyageId = +this.route.snapshot.paramMap.get('id')!;
    this.getVoyages();
  }

  afficher(voyage: Voyage) {
    this.IdVoyage = voyage.id;
    this.jourVoyage = voyage.jour;
    this.generateDates();
    this.visible = true;
  }

  // getVoyage() {
  //   // Récupérer tous les voyages
  //   this.crudService.getVoyageAgence(this.voyageId).subscribe({
  //     next: (data) => {
  //       this.allVoyages = data; // Stocker tous les voyages récupérés
  //       this.filterVoyagesByDay();
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors de la récupération des voyages :', err);
  //     },
  //   });
  // }

  generateDates() {
    if (this.jourVoyage) {
      const dayIndex = this.jour.indexOf(this.jourVoyage);
      const today = new Date();
      this.datesDisponibles = [];

      for (let i = 0; i < 10; i++) {
        // Génère les 10 prochaines dates correspondant à VoyageJour
        const date = new Date(today);
        date.setDate(
          today.getDate() + ((7 + dayIndex - today.getDay()) % 7) + i * 7
        );
        this.datesDisponibles.push(date.toISOString().slice(0, 10)); // Format YYYY-MM-DD
      }
    }
  }

  Reservation() {
    if ((this.ReservForm.valid, this.jourVoyage)) {
      const reservation: Reservation = {
        //numeropayement: this.ReservForm.get('numPayement')?.value,
        date: this.ReservForm.get('DateVoyage')?.value,
        client: {
          nom: this.ReservForm.get('Nom')?.value,
          prenom: this.ReservForm.get('Prenom')?.value,
          telephone: this.ReservForm.get('telephone')?.value,
        } as Client,
        voyage: { id: this.IdVoyage } as Voyage,
        // date: this.currentDate, // Assurez-vous que vous passez l'ID du voyage
      };

        this.voyageService.Reserver(reservation).subscribe({
          next: (res) => {
            this.ReservForm.reset();
            console.log('Vous avez deja reserver', res);
            // this.succes = true;
            this.visible = false;
          },
          error: (err) => {
            console.error('Erreur lors de la réservation :', err);
          },
        });
    } else {
      //this.erreur = 'formulaire invalide';
    }
  }

  getReservation(voyageId: number): void {
    this.showListe();
    this.reservationService.getReservationByVoyage(voyageId).subscribe({
      next: (data) => {
        this.reservation = data; // Stocker tous les voyages récupérés
        this.filterVoyagesByDay();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des voyages : ', err);
      },
    });
  }
  getVoyages(): void {
    this.voyageService.getVoyages().subscribe({
      next: (data) => {
        this.allVoyages = data; // Stocker tous les voyages récupérés
        this.filterVoyagesByDay();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des voyages : ', err);
      },
    });
  }
  // getReservation(): void {
  //   this.voyageService.getVoyages().subscribe({
  //     next: (data) => {
  //       this.allVoyages = data; // Stocker tous les voyages récupérés
  //       this.filterVoyagesByDay();
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors de la récupération des voyages : ', err);
  //     },
  //   });
  // }

  filterVoyagesByDay() {
    this.voyages = []; // Réinitialiser le tableau des voyages filtrés

    // Vérifier chaque boolean et filtrer les voyages correspondants
    if (this.lundi) {
      this.voyages.push(...this.allVoyages.filter((v) => v.jour === 'Lundi'));
    }
    if (this.mardi) {
      this.voyages.push(...this.allVoyages.filter((v) => v.jour === 'Mardi'));
    }
    if (this.mercredi) {
      this.voyages.push(
        ...this.allVoyages.filter((v) => v.jour === 'Mercredi')
      );
    }
    if (this.jeudi) {
      this.voyages.push(...this.allVoyages.filter((v) => v.jour === 'Jeudi'));
    }
    if (this.vendredi) {
      this.voyages.push(
        ...this.allVoyages.filter((v) => v.jour === 'Vendredi')
      );
    }
    if (this.samedi) {
      this.voyages.push(...this.allVoyages.filter((v) => v.jour === 'Samedi'));
      console.log('Voyages après filtrage :', this.voyages);
    }
    if (this.dimanche) {
      this.voyages.push(
        ...this.allVoyages.filter((v) => v.jour === 'Dimanche')
      );
      console.log('Voyages après filtrage :', this.voyages);
    }

    console.log('Voyages filtrés :', this.voyages);
  }

  Lundi() {
    this.lundi = true;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = false;

    // this.Aujourdhui = 'lundi';

    this.filterVoyagesByDay();
  }
  Mardi() {
    this.lundi = false;
    this.mardi = true;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = false;

    // this.Aujourdhui = 'mardi';

    this.filterVoyagesByDay();
  }
  Mercredi() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = true;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = false;
    this.filterVoyagesByDay();
    this.getVoyages();
  }
  Jeudi() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = true;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = false;

    // this.Aujourdhui = 'jeudi';

    this.filterVoyagesByDay();
    this.getVoyages();
  }
  Vendredi() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = true;
    this.samedi = false;
    this.dimanche = false;

    // this.Aujourdhui = 'vendredi';

    this.filterVoyagesByDay();
    this.getVoyages();
  }
  Samedi() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = true;
    this.dimanche = false;

    // this.Aujourdhui = 'samedi';

    this.filterVoyagesByDay();
    this.getVoyages();
  }
  Dimanche() {
    this.lundi = false;
    this.mardi = false;
    this.mercredi = false;
    this.jeudi = false;
    this.vendredi = false;
    this.samedi = false;
    this.dimanche = true;

    // this.Aujourdhui = 'dimanche';

    this.filterVoyagesByDay();
    this.getVoyages();
  }

  cacher() {
    this.visible = false;
  }
  showListe() {
    this.liste = true;
  }
  hideliste() {
    this.liste = false;
  }

  Showbillet(ReservationId: number) {
    this.billet = true;
    this.reservationService
      .getReservationById(ReservationId)
      .subscribe((reservation) => {
        this.BilletAffiche = reservation;
      });
  }
  Hidebillet() {
    this.billet = false;
    this.BilletAffiche = null;
  }

  // @ViewChild('billetContent') billetContent!: ElementRef;
  // printBillet() {
  //   // const billetContent = this.billetContent.nativeElement.innerHTML;
  //   // const printWindow = window.open('', '', 'height=600,width=800');
  //   // printWindow!.document.write(
  //   //   '<html><head><title>Imprimer le Billet</title>'
  //   // );
  //   // printWindow!.document.write(
  //   //   '<style>body{ font-family: Arial, sans-serif; }</style>'
  //   // ); // Ajout de styles si nécessaire
  //   // printWindow!.document.write('</head><body>');
  //   // printWindow!.document.write(billetContent);
  //   // printWindow!.document.write('</body></html>');
  //   // printWindow!.document.close();
  //   // printWindow!.focus();
  //   // printWindow!.print();
  //   // printWindow!.close();
  //   window.print();
  // }

  generateImageAndPrint() {
    const billetElement = document.querySelector('.billets'); // Sélectionne l'élément .billets

    if (billetElement) {
      html2canvas(billetElement as HTMLElement)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png'); // Convertit le canvas en image

          // Crée une nouvelle fenêtre pour afficher l'image
          const printWindow = window.open('', '_blank', 'width=800,height=600');
          if (printWindow) {
            printWindow.document.write(`
          <html>
            <head><title>Imprimer le billet</title></head>
            <body style="text-align: center; margin: 0; padding: 0;">
              <img src="${imgData}" style="width:100%; max-width: 600px;"/>
            </body>
          </html>
        `);

            // Attendre que la fenêtre soit complètement chargée
            printWindow.document.close();

            // Délai court pour s'assurer que le contenu est bien chargé avant d'ouvrir la boîte de dialogue d'impression
            printWindow.onload = () => {
              printWindow.focus(); // Met la fenêtre au premier plan
              printWindow.print(); // Ouvre la boîte de dialogue d'impression
            };
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la génération de l'image :", error);
        });
    } else {
      console.error('Élément billet introuvable.');
    }
  }
}
