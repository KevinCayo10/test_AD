import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuarios.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url = '/users';
  constructor(private http: HttpClient) {}

  cargarUsuarios(): Observable<any> {
    return this.http.get(this.url);
  }

  cargarUsuario(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.url, usuario);
  }

  actualizarUsuario(id: string, usuario: Usuario): Observable<any> {
    return this.http.put(`${this.url}/${id}`, usuario);
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
