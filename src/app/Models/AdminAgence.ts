import { AdminComp } from './AdminComp';
import { Agence } from './Agence';
import { Compagnie } from './Compagnie';
import { Utilisateur } from './Utilisateur';

export interface AdminAgence extends Utilisateur {
  bloquer?: false;
  compagnie?: Compagnie;
  agence?: Agence;
}
