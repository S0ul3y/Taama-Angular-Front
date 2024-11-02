import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginEvent, ReqRep } from '../../Models/DTO/ReqRep';
import { Role, Utilisateur } from '../../Models/Utilisateur';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    RouterOutlet,
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | undefined;
  isPasswordVisible = false;
  Utilisateur: Utilisateur[] = [];

  @Output() loginEvent = new EventEmitter<LoginEvent>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('jwt');

    if (token) {
      // Rediriger vers le tableau de bord si déjà connecté
      this.router.navigate(['/dashboard/accueil']);
    }
  }

  

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginRequest = this.loginForm.value;

    this.http
      .post<ReqRep>('http://localhost:8080/api/auth/login', loginRequest)
      .subscribe((response) => {
        if (response.token) {
          // this.Utilisateur.push(response.role);
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('userRole', response.role);

          // Récupérer l'objet roleType complet
           
           const role = response.role;
          console.log('Token JWT:', response.token);
          console.log('Rôle utilisateur complet:', role);

          // Émettre l'événement de connexion
          this.loginEvent.emit({
            success: true,
            message: response.message,
          });
          this.router.navigate(['/dashboard/accueil']);
        } else {
          console.error('Erreur de connexion:');
          this.errorMessage = 
            'Erreur de connexion. Veuillez vérifier vos informations.';
          this.loginEvent.emit({
            success: false,
            message: this.errorMessage,
          });
        }
      });
  }

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}




















