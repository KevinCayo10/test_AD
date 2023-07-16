export class Usuario {
  id_usuario?: string;
  cedula?: string;
  nombre?: string;
  apellido?: string;
  correo?: string;
  contrasena?: string;
  rol?: string;

  constructor(
    id_usuario?: string,
    cedula?: string,
    nombre?: string,
    apellido?: string,
    correo?: string,
    contrasena?: string,
    rol?: string
  ) {
    this.id_usuario = id_usuario;
    this.cedula = cedula;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.contrasena = contrasena;
    this.rol = rol;
  }
}
