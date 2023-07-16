import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestamo } from '../models/prestamo.model';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  url = '/loans';
  // apiAprobar = '/loans/aprobar';
  // apiRechazar = '/loans/rechazar';
  // apiDevolver = '/loans/devolver';

  constructor(private http: HttpClient) {}

  cargarPrestamos(): Observable<any> {
    return this.http.get(this.url);
  }

  cargarPretamo(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  registrarPrestamo(cliente: Prestamo): Observable<any> {
    return this.http.post(this.url, cliente);
  }

  actualizarPrestamo(id: string, cliente: Prestamo): Observable<any> {
    return this.http.put(`${this.url}/${id}`, cliente);
  }

  eliminarPrestamo(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  aprobarPrestamo(
    id_prestamo: string,
    id_usuario_presta_per: string
  ): Observable<any> {
    const body = { id_usuario_presta_per: id_usuario_presta_per };
    return this.http.put(`${this.url}/aprobar/${id_prestamo}`, body);
  }

  rechazarPrestamo(id_prestamo: string): Observable<any> {
    const body = { id_usuario_presta_per: 'hola' };
    return this.http.put(`${this.url}/rechazar/${id_prestamo}`, body);
  }

  devolverPrestamo(
    id_prestamo: string,
    observaciones: string
  ): Observable<any> {
    const body = { observaciones: observaciones };
    return this.http.put(`${this.url}/devolver/${id_prestamo}`, body);
  }
}
