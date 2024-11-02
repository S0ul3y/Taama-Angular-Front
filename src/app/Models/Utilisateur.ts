import { Time } from '@angular/common';
export interface Utilisateur {
  id?: number;
  username: string;
  nom: string;
  prenom: string;
  telephone: string;
  statut?: string;
  password: string;
  role?: Role; // Le rôle est lié ici
  bloquer?:false;

  image?:string;

}

export interface Role {
  id: number;
  role: string; // Nom du rôle, par exemple "Admin", "Client", etc.
}
