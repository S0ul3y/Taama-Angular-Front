import { Time } from "@angular/common";
import { Compagnie } from "./Compagnie";

export interface Voyage {
  id?: number;
  ville_depart: string;
  ville_arrivee: string;
  heure: string;
  jour: string;
  // jour: jour;
  compagnie?: Compagnie;
  nbr_place: number;
  statut?: string;
  prix: number;
  bloquer?: false;
}
export interface jour {
  id: number;
  jour: string;
}

export interface ville {
  id: number;
  ville: string;
}


