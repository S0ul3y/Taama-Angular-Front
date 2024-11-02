import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-conteneur',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './conteneur.component.html',
  styleUrl: './conteneur.component.scss'
})
export class ConteneurComponent {

}
