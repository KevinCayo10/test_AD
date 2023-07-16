import { Component } from '@angular/core';
import { PrestamoService } from '../../services/prestamo.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { KeypadButton } from '../../../shared/interfaces/keypadButton.interface';
import { MetaDataColumn } from '../../../shared/interfaces/metadatacolumn.interface';

@Component({
  selector: 'gsv-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  registros: any[] = [
    {
      _id: 1,
      nombresCompletos: 'Juan Pérez',
      correoElectronico: 'juan.perez@mail.com',
      direccion: 'Av. Quito',
      celular: '0991234567',
    },
  ];
  title: string = 'PRESTAMOS';
  // El formulario es para poder abrir o cerrar el componente form
  formulario!: boolean;

  fila!: any;

  metaDataColumns: MetaDataColumn[] = [
    { field: 'id_prestamo', title: 'ID' },
    { field: 'id_equipo_per', title: 'ID EQUIPO' },
    { field: 'fecha_prestamo', title: 'FECHA DEL PRESTAMO' },
    { field: 'fecha_devolucion', title: 'FECHA DE DEVOLUCION' },
    { field: 'id_usuario_presta_per', title: 'TECNICO' },
    { field: 'id_usuario_solicita_per', title: 'USUARIO' },
    { field: 'observaciones', title: 'OBSERVACION' },
    { field: 'estado', title: 'ESTADO' },
  ];

  keypadButtons: KeypadButton[] = [
    {
      icon: 'fa-solid fa-cloud-arrow-down',
      color: 'btn-success',
      accion: 'download',
    },
    { icon: 'fa-solid fa-plus', color: 'btn-primary', accion: 'NUEVO' },
  ];

  data: any[] = [];
  totalRegistros = this.data.length;

  constructor(private prestamoService: PrestamoService) {
    this.cargarClientes('');
  }

  cargarClientes(buscar: string) {
    /* this.data = this.registros;
    this.totalRegistros = this.data.length;
    this.changePage(0);*/

    this.prestamoService.cargarPrestamos().subscribe((dataWeb) => {
      this.registros = dataWeb;
      if (buscar) {
        console.log(buscar);
        this.registros = this.registros.filter((registro) =>
          registro.nombresCompletos.toLowerCase().includes(buscar.toLowerCase())
        );
        console.log(this.registros);
      }
      this.totalRegistros = this.registros.length;
      this.changePage(0);
    });
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const salto = pageSize * page;
    this.data = this.registros.slice(salto, salto + pageSize);
  }

  enviarAccion(accion: string) {
    switch (accion) {
      case 'DOWNLOAD':
        break;
      case 'NUEVO':
        this.formulario = true;
        this.abrirFormulario();
        break;
    }
  }

  accionEditar(row: any) {
    this.formulario = true;
    this.abrirFormulario(row);
  }

  accionEliminar(id: any) {
    console.log('Entro a pagelis');
    this.prestamoService.eliminarPrestamo(id).subscribe(() => {
      this.cargarClientes('');
    });
  }
  accionAprobar(row: any) {
    console.log(row);
    //AQUI TOCA MANDAR EL ID DEL LABORATORISTA QUE SE LOGEA.
    this.prestamoService
      .aprobarPrestamo(row.id_prestamo, '3')
      .subscribe((resp) => {
        this.mostrarMensaje('Prestamo aprobado');
        this.cargarClientes('');
      });
  }
  accionRechazar(row: any) {
    this.prestamoService.rechazarPrestamo(row.id_prestamo).subscribe((resp) => {
      this.mostrarMensaje('Prestamo rechazado');
      this.cargarClientes('');
    });
  }

  buscarData(searchData: any) {
    console.log(searchData);
    this.cargarClientes(searchData.terminoBusqueda);
  }

  grabarFormulario(formData: any) {
    if (!formData) {
      this.formulario = false;
      return;
    }
    if (formData.id_prestamo) {
      const cliente = { ...formData };
      console.log('Entro al ID');
      console.log(cliente);
      this.prestamoService
        .devolverPrestamo(formData.id_prestamo, cliente.observaciones)
        .subscribe(() => {
          this.cargarClientes('');
          this.formulario = false;
          this.mostrarMensajeActualizacion();
        });
    } else {
      const cliente = { ...formData };
      this.prestamoService.registrarPrestamo(cliente).subscribe(() => {
        console.log('Dentro regsitrar');
        console.log(cliente);
        this.cargarClientes('');
        this.formulario = false;
        this.mostrarMensajeAñadir();
      });
    }
  }

  abrirFormulario(fila: any = null) {
    this.fila = fila;
  }

  cerrarFormulario() {
    this.formulario = false;
  }

  mostrarMensajeActualizacion(): void {
    Swal.fire({
      title: 'Registro actulaizado',
      icon: 'info',
      timer: 3000,
      showConfirmButton: false,
    });
  }

  mostrarMensajeAñadir(): void {
    Swal.fire({
      title: 'Registro añadido',
      icon: 'info',
      timer: 3000,
      showConfirmButton: false,
    });
  }

  mostrarMensaje(mensaje: String) {
    Swal.fire({
      title: mensaje,
      icon: 'info',
      timer: 3000,
      showConfirmButton: false,
    });
  }
}
