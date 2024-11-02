import { Injectable } from '@angular/core';
import { CrudServiceService } from './CrudService';
import { Observable } from 'rxjs';
import { Compagnie } from '../Models/Compagnie';

@Injectable({
  providedIn: 'root',
})
export class CompagnieService {
  private endpoint = 'compagnie'; // L'endpoint spécifique pour les voyages

  constructor(private crudService: CrudServiceService) {}

  /**
   * Récupère la liste de tous les voyages.
   *
   * @return {Observable<Voyage[]>} Un observable qui émet la liste des voyages.
   */
  getCompagnie(): Observable<Compagnie[]> {
    return this.crudService.get(this.endpoint);
  }

  /**
   * Ajoute un nouveau voyage.
   *
   * @param {Voyage} voyage - Le voyage à ajouter.
   * @return {Observable<Object>} Un observable qui émet la réponse du serveur.
   */
  ajouterCompagnie(voyage: Compagnie): Observable<Object> {
    return this.crudService.post(this.endpoint, voyage);
  }

  /**
   * Met à jour un voyage existant.
   *
   * @param {number} id - L'ID du voyage à mettre à jour.
   * @param {Voyage} voyage - Les données mises à jour du voyage.
   * @return {Observable<Object>} Un observable qui émet le voyage mis à jour.
   */
  modifierCompagnie(id: number, voyage: Compagnie): Observable<Object> {
    return this.crudService.update(this.endpoint, id, voyage);
  }

  /**
   * Active ou désactive un voyage.
   *
   * @param {number} id - L'ID du voyage à activer ou désactiver.
   * @param {Object} body - Le corps de la requête à envoyer.
   * @return {Observable<Object>} Un observable qui émet la réponse du serveur.
   */
  activerCompagnie(id: number): Observable<Object> {
    return this.crudService.active(this.endpoint, id);
  }

  /**
   * Supprime un voyage.
   *
   * @param {number} id - L'ID du voyage à supprimer.
   * @return {Observable<any>} Un observable qui émet la réponse du serveur.
   */
  supprimerCompanie(id: number): Observable<any> {
    return this.crudService.delete(this.endpoint, id);
  }

}
