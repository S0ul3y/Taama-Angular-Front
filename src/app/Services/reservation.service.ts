import { Injectable } from '@angular/core';
import { jour, Voyage } from '../Models/Voyage';
import { Observable } from 'rxjs';
import { CrudServiceService } from './CrudService';
import { Reservation } from '../Models/Reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private endpoint = 'reservation/voyage'; // L'endpoint spécifique pour les voyages
  private Byid = 'reservation'; // L'endpoint spécifique pour les voyages

  constructor(private crudService: CrudServiceService) {}

  getReservationByVoyage(voyageId: number): Observable<Reservation[]> {
    return this.crudService.get(`${this.endpoint}/${voyageId}`);
  }
  getReservationById(voyageId: number): Observable<Reservation> {
    return this.crudService.get(`${this.Byid}/${voyageId}`);
  }

  // getjour(): Observable<jour[]> {
  //   return this.crudService.get('jour');
  // }
  // getville(): Observable<ville[]> {
  //   return this.crudService.get('ville');
  // }
}
