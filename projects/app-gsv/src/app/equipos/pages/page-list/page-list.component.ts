import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { KeypadButton } from '../../../shared/interfaces/keypadButton.interface';
import { MetaDataColumn } from '../../../shared/interfaces/metadatacolumn.interface';
import { EquipoService } from '../../services/equipo.service';

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
    {
      _id: 2,
      nombresCompletos: 'María Gómez',
      correoElectronico: 'maria.gomez@mail.com',
      direccion: 'Av. Guayaquil',
      celular: '0987654321',
    },
    {
      _id: 3,
      nombresCompletos: 'Pedro López',
      correoElectronico: 'pedro.lopez@mail.com',
      direccion: 'Av. Cuenca',
      celular: '0999876543',
    },
  ];
  title: string = 'CLIENTES';
  // El formulario es para poder abrir o cerrar el componente form
  formulario!: boolean;

  fila!: any;

  metaDataColumns: MetaDataColumn[] = [
    { field: 'id_equipo', title: 'ID' },
    { field: 'nombre_equipo', title: 'NOMBRE' },
    { field: 'marca', title: 'MARCA' },
    { field: 'caracteristicas', title: 'CARACTERISTICA' },
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

  constructor(private equipoService: EquipoService) {
    this.cargarClientes('');
  }

  cargarClientes(buscar: string) {
    /* this.data = this.registros;
    this.totalRegistros = this.data.length;
    this.changePage(0);*/

    this.equipoService.cargarEquipos().subscribe((dataWeb) => {
      this.registros = dataWeb;
      if (buscar) {
        console.log(buscar);
        this.registros = this.registros.filter((registro) =>
          registro.nombre.toLowerCase().includes(buscar.toLowerCase())
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
    this.equipoService.eliminarEquipo(id).subscribe(() => {
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
    if (formData.id_equipo) {
      const equipo = { ...formData };
      console.log('Entro al ID');
      console.log(equipo);
      this.equipoService
        .actualizarEquipo(formData.id_equipo, equipo)
        .subscribe(() => {
          this.cargarClientes('');
          this.formulario = false;
          this.mostrarMensajeActualizacion();
        });
    } else {
      const equipo = { ...formData };
      this.equipoService.registrarEquipo(equipo).subscribe(() => {
        console.log('Dentro regsitrar');
        console.log(equipo);
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
}
