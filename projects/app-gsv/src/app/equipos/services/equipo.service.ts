import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo.model';

@Injectable({
  providedIn: 'root',
})
export class EquipoService {
  url = '/equipments';
  constructor(private http: HttpClient) {}

  cargarEquipos(): Observable<any> {
    return this.http.get(this.url);
  }

  cargarEquipo(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  registrarEquipo(equipo: Equipo): Observable<any> {
    return this.http.post(this.url, equipo);
  }

  actualizarEquipo(id: string, equipo: Equipo): Observable<any> {
    return this.http.put(`${this.url}/${id}`, equipo);
  }

  eliminarEquipo(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
