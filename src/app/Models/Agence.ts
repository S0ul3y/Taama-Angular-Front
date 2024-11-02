import { AdminAgence } from './AdminAgence';
import { AdminComp } from './AdminComp';
import { Compagnie } from './Compagnie';
import { Utilisateur } from './Utilisateur';

export interface Agence {
  id?: number;
  nom: string;
  statut?: string;
  region?: string;
  adminAgence?: AdminAgence;
  compagnie?: Compagnie;
  bloquer?: false;
}
