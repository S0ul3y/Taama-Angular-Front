import { Compagnie } from "./Compagnie";
import { Utilisateur } from "./Utilisateur";

export interface AdminComp extends Utilisateur {
  bloquer?: false;
  compagnie?: Compagnie;
}
