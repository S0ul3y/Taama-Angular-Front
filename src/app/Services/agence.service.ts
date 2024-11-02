import { Injectable } from '@angular/core';
import { CrudServiceService } from './CrudService';
import { Observable } from 'rxjs';
import { Agence } from '../Models/Agence';

@Injectable({
  providedIn: 'root',
})
export class AgenceService {
  private endpoint = 'agence'; // L'endpoint spécifique pour les voyages

  constructor(private crudService: CrudServiceService) {}

  /**
   * Récupère la liste de tous les voyages.
   *
   * @return {Observable<Agence[]>} Un observable qui émet la liste des voyages.
   */
  getAgence(): Observable<Agence[]> {
    return this.crudService.get(this.endpoint);
  }

  /**
   * Ajoute un nouveau voyage.
   *
   * @param {Agence} voyage - Le voyage à ajouter.
   * @return {Observable<Object>} Un observable qui émet la réponse du serveur.
   */
  ajouterAgence(voyage: Agence): Observable<Object> {
    return this.crudService.post(this.endpoint, voyage);
  }

  /**
   * Met à jour un voyage existant.
   *
   * @param {number} id - L'ID du voyage à mettre à jour.
   * @param {Agence} voyage - Les données mises à jour du voyage.
   * @return {Observable<Object>} Un observable qui émet le voyage mis à jour.
   */
  modifierAgence(id: number, voyage: Agence): Observable<Object> {
    return this.crudService.update(this.endpoint, id, voyage);
  }

  /**
   * Active ou désactive un voyage.
   *
   * @param {number} id - L'ID du voyage à activer ou désactiver.
   * @param {Object} body - Le corps de la requête à envoyer.
   * @return {Observable<Object>} Un observable qui émet la réponse du serveur.
   */
  activerAgence(id: number): Observable<Object> {
    return this.crudService.active(this.endpoint, id);
  }

  /**
   * Supprime un voyage.
   *
   * @param {number} id - L'ID du voyage à supprimer.
   * @return {Observable<any>} Un observable qui émet la réponse du serveur.
   */
  supprimerAgence(id: number): Observable<any> {
    return this.crudService.delete(this.endpoint, id);
  }
}
