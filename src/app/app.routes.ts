import { Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UtilisateurComponent } from './component/utilisateur/utilisateur.component';
import { SousAgenceComponent } from './component/agence/sous-agence.component';
import { VoyageComponent } from './component/voyage/voyage.component';
import { ReservationComponent } from './component/reservation/reservation.component';
import { DashContentComponent } from './component/dash-content/dash-content.component';
import { AgenceComponent } from './component/compagnie/agence.component';
import { LoginComponent } from './component/login/login.component';
import { AdminAgenceComponent } from './component/admin-agence/admin-agence.component';
import { AdminCompagnieComponent } from './component/admin-compagnie/admin-compagnie.component';
import { AdminAgencesComponent } from './component/admin-agences/admin-agences.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'accueil', component: DashboardComponent },
  // { path: 'dashboard', component: DashboardComponent, outlet: 'sidebar' },
  // { path: 'accueil', component: DashContentComponent, outlet: 'sidebar' },
  // { path: 'utilisateurs', component: UtilisateurComponent, outlet: 'sidebar' },
  // { path: 'compagnie', component: AgenceComponent },
  // { path: 'agence', component: SousAgenceComponent },
  // { path: 'voyage', component: VoyageComponent },
  // { path: 'reservation', component: ReservationComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'accueil', component: DashContentComponent }, // Route enfant dans le dashboard
      { path: 'utilisateurs', component: UtilisateurComponent },
      { path: 'admin_agence', component: AdminAgenceComponent },
      { path: 'admin_comp', component: AdminCompagnieComponent },
      { path: 'compagnie', component: AgenceComponent },
      { path: 'agence', component: SousAgenceComponent },
      { path: 'voyage', component: VoyageComponent },
      { path: 'reservation', component: ReservationComponent },
      { path: 'admin_a', component: AdminAgencesComponent },
    ],
  },
];
