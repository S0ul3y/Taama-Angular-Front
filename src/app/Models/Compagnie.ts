import { AdminComp } from "./AdminComp";
import { Utilisateur } from "./Utilisateur";

export interface Compagnie {
  id?: number;
  nom: string;
  statut?: string;
  adminComp?: AdminComp;
  bloquer?: false;
}
