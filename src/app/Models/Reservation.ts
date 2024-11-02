import { Compagnie } from './Compagnie';
import { Utilisateur } from './Utilisateur';
import { Voyage } from './Voyage';

export interface Reservation {
  id?: number;
  date?: Date;
  numeropayement?: string;
  code?: number;
  statut?: string;
  client?: Utilisateur;
  voyage?: Voyage;
  compagnie?: Compagnie;
  bloquer?: false;
}
