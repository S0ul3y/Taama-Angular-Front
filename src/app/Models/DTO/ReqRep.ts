import { Role } from "../Utilisateur";

export interface ReqRep {
  token: string;
  role: string;
  message: string;
  statusCode: number;
  error : string;
  refreshToke : string;
  expirationT : string;
  nom : string;
  prenom : string;
  username : string;
  telephone : string;
  password : string;
}

export interface LoginEvent {
  success: boolean;
  message: string;
}