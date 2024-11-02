import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute,NavigationEnd,Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, NgClass, RouterOutlet,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  visible = false;
  activeRoute: string = '';
  ListeUser = false;
  WhiteBack = false;
  role: string | null = null;

  constructor(
    private authService: AuthServiceService,
    public router: Router,
    private location: Location
  ) {
    this.activeRoute = '/dashboard/accueil';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
      }
    });
  }


  ngOnInit(): void {
    this.activeRoute = this.router.url;

    this.authService.userRole$.subscribe((role) => {
      this.role = localStorage.getItem('userRole');
      console.log('je suis admin sidebar', this.role);
    });

    const token = localStorage.getItem('jwt');
    if (!token) {
      // Si pas de token, rediriger vers la page de login
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userRole');
    // Empêcher la mise en cache de la page
    this.location.replaceState('/login');
    // Rediriger vers la page de login en remplaçant l'URL dans l'historique
    this.router.navigate(['/login'], { replaceUrl: true });
  }


  toogleUserliste(){
    this.ListeUser = !this.ListeUser;
    this.WhiteBack = !this.WhiteBack;
  }

  Affiche() {
    if (this.visible === false) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }
}
