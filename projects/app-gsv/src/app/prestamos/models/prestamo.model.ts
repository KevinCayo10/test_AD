export class Prestamo {
  id_prestamo?: string;
  id_equipo_per?: string;
  fecha_prestamo?: string;
  fecha_devolucion?: string;
  id_usuario_presta_per?: string;
  id_usuario_solicita_per?: string;
  observaciones?: string;
  estado?: string;

  constructor(
    id_prestamo?: string,
    id_equipo_per?: string,
    fecha_prestamo?: string,
    fecha_devolucion?: string,
    id_usuario_presta_per?: string,
    id_usuario_solicita_per?: string,
    observaciones?: string,
    estado?: string
  ) {
    this.id_prestamo = id_prestamo;
    this.id_equipo_per = id_equipo_per;
    this.fecha_prestamo = fecha_prestamo;
    this.fecha_devolucion = fecha_devolucion;
    this.id_usuario_presta_per = id_usuario_presta_per;
    this.id_usuario_solicita_per = id_usuario_solicita_per;
    this.observaciones = observaciones;
    this.estado = estado;
  }
}
