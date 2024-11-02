import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./component/sidebar/sidebar.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { LoginComponent } from "./component/login/login.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, DashboardComponent, LoginComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Taama';
  // user = 1;
  // user = null;
}
