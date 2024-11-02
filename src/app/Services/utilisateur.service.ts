import { Injectable } from '@angular/core';
import { CrudServiceService } from './CrudService';
import { Observable } from 'rxjs';
import { Utilisateur } from '../Models/Utilisateur';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private admin = 'admin'; // L'endpoint spécifique pour les voyages
  private admin_c = 'admin_c'; // L'endpoint spécifique pour les voyages
  private admin_a = 'admin_a'; // L'endpoint spécifique pour les voyages
  private client = 'admin/client'; // L'endpoint spécifique pour les voyages
  private All = 'currentuser'; // L'endpoint spécifique pour les voyages
  private nbreclient = 'client/nbr'; // L'endpoint spécifique pour les voyages
  private nbreAgence = 'client/agence/nbr'; // L'endpoint spécifique pour les voyages
  private nbreReservation = 'reservation/nbr'; // L'endpoint spécifique pour les voyages

  constructor(private crudService: CrudServiceService) {}

  // GetClient

  /**
   * Récupère la liste de tous les voyages.
   *
   * @return {Observable<Utilisateur[]>} Un observable qui émet la liste des voyages.
   */
  getClient(): Observable<Utilisateur[]> {
    return this.crudService.get(this.client);
  }
  getNbrClient(): Observable<any> {
    return this.crudService.get(this.nbreclient);
  }
  getNbrAgence(): Observable<any> {
    return this.crudService.get(this.nbreAgence);
  }
  getNbrReservation(): Observable<any> {
    return this.crudService.get(this.nbreReservation);
  }

  getCurrentUser(): Observable<Utilisateur> {
    return this.crudService.get(this.All);
  }

  /**
   * Récupère la liste de tous les voyages.
   *
   * @return {Observable<Utilisateur[]>} Un observable qui émet la liste des voyages.
   */
  getAdmin(): Observable<Utilisateur[]> {
    return this.crudService.get(this.admin);
  }

  /**
   * Ajoute un nouveau voyage.
   *
   * @param {Voyage} voyage - Le voyage à ajouter.
   * @return {Observable<Object>} Un observable qui émet la réponse du serveur.
   */
  ajouterAdmin(utilisateur: Utilisateur): Observable<Object> {
    return this.crudService.post(this.admin, utilisateur);
  }

  /**
   * Met à jour un voyage existant.
   *
   * @param {number} id - L'ID du voyage à mettre à jour.
   * @param {Voyage} voyage - Les données mises à jour du voyage.
   * @return {Observable<Object>} Un observable qui émet le voyage mis à jour.
   */
  modifierAdmin(id: number, utilisateur: Utilisateur): Observable<Object> {
    return this.crudService.update(this.admin, id, utilisateur);
  }

  /**
   * Active ou désactive un voyage.
   *
   * @param {number} id - L'ID du voyage à activer ou désactiver.
   * @param {Object} body - Le corps de la requête à envoyer.
   * @return {Observable<Object>} Un observable qui émet la réponse du serveur.
   */
  activerAdmin(id: number): Observable<Object> {
    return this.crudService.active(this.admin, id);
  }

  /**
   * Supprime un voyage.
   *
   * @param {number} id - L'ID du voyage à supprimer.
   * @return {Observable<any>} Un observable qui émet la réponse du serveur.
   */
  supprimerAdmin(id: number): Observable<any> {
    return this.crudService.delete(this.admin, id);
  }

  // Ajouter Admin Compgnie ===================================================================================================

  /**
   * Récupère la liste de tous les voyages.
   *
   * @return {Observable<Utilisateur[]>} Un observable qui émet la liste des voyages.
   */
  getAdminC(): Observable<Utilisateur[]> {
    return this.crudService.get(this.admin_c);
  }

  /**
   * Ajoute un nouveau voyage.
   *
   * @param {Voyage} voyage - Le voyage à ajouter.
   * @return {Observable<Object>} Un observable qui émet la réponse du serveur.
   */
  ajouterAdminC(utilisateur: Utilisateur): Observable<Object> {
    return this.crudService.post(this.admin_c, utilisateur);
  }

  /**
   * Met à jour un voyage existant.
   *
   * @param {number} id - L'ID du voyage à mettre à jour.
   * @param {Voyage} voyage - Les données mises à jour du voyage.
   * @return {Observable<Object>} Un observable qui émet le voyage mis à jour.
   */
  modifierAdminC(id: number, utilisateur: Utilisateur): Observable<Object> {
    return this.crudService.update(this.admin_c, id, utilisateur);
  }

  /**
   * Active ou désactive un voyage.
   *
   * @param {number} id - L'ID du voyage à activer ou désactiver.
   * @param {Object} body - Le corps de la requête à envoyer.
   * @return {Observable<Object>} Un observable qui émet la réponse du serveur.
   */
  activerAdminC(id: number): Observable<Object> {
    return this.crudService.active(this.admin, id);
  }

  /**
   * Supprime un voyage.
   *
   * @param {number} id - L'ID du voyage à supprimer.
   * @return {Observable<any>} Un observable qui émet la réponse du serveur.
   */
  supprimerAdminC(id: number): Observable<any> {
    return this.crudService.delete(this.admin_c, id);
  }

  // Ajouter Admin Agence =======================================================================================================================

  /**
   * Récupère la liste de tous les voyages.
   *
   * @return {Observable<Utilisateur[]>} Un observable qui émet la liste des voyages.
   */
  getAdminA(): Observable<Utilisateur[]> {
    return this.crudService.get(this.admin_a);
  }

  /**
   * Ajoute un nouveau voyage.
   *
   * @param {Voyage} voyage - Le voyage à ajouter.
   * @return {Observable<Object>} Un observable qui émet la réponse du serveur.
   */
  ajouterAdminA(utilisateur: Utilisateur): Observable<Object> {
    return this.crudService.post(this.admin_a, utilisateur);
  }

  /**
   * Met à jour un voyage existant.
   *
   * @param {number} id - L'ID du voyage à mettre à jour.
   * @param {Voyage} voyage - Les données mises à jour du voyage.
   * @return {Observable<Object>} Un observable qui émet le voyage mis à jour.
   */
  modifierAdminA(id: number, utilisateur: Utilisateur): Observable<Object> {
    return this.crudService.update(this.admin_a, id, utilisateur);
  }

  /**
   * Active ou désactive un voyage.
   *
   * @param {number} id - L'ID du voyage à activer ou désactiver.
   * @param {Object} body - Le corps de la requête à envoyer.
   * @return {Observable<Object>} Un observable qui émet la réponse du serveur.
   */
  activerAdminA(id: number): Observable<Object> {
    return this.crudService.active(this.admin_a, id);
  }

  /**
   * Supprime un voyage.
   *
   * @param {number} id - L'ID du voyage à supprimer.
   * @return {Observable<any>} Un observable qui émet la réponse du serveur.
   */
  supprimerAdminA(id: number): Observable<any> {
    return this.crudService.delete(this.admin_a, id);
  }
}
