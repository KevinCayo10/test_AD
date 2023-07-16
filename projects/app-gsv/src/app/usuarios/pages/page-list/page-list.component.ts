import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { KeypadButton } from '../../../shared/interfaces/keypadButton.interface';
import { MetaDataColumn } from '../../../shared/interfaces/metadatacolumn.interface';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'gsv-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  registros: any[] = [
    {
      _id: 1,
      cedula: '1702',
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'juan.perez@mail.com',
      direccion: 'Av. Quito',
      celular: '0991234567',
      contraseña: '123',
      rol: 'Estudiante',
    },
  ];
  title: string = 'USUARIOS';
  // El formulario es para poder abrir o cerrar el componente form
  formulario!: boolean;

  fila!: any;

  metaDataColumns: MetaDataColumn[] = [
    { field: 'id_usuario', title: 'ID' },
    { field: 'cedula', title: 'CEDULA' },
    { field: 'nombre', title: 'NOMBRE' },
    { field: 'apellido', title: 'APELLIDO' },
    { field: 'correo', title: 'CORREO' },
    { field: 'contrasena', title: 'CONTRASEÑA' },
    { field: 'rol', title: 'ROL' },
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

  constructor(private usuarioService: UsuarioService) {
    this.cargarClientes('');
  }

  cargarClientes(buscar: string) {
    /* this.data = this.registros;
    this.totalRegistros = this.data.length;
    this.changePage(0);*/

    this.usuarioService.cargarUsuarios().subscribe((dataWeb) => {
      this.registros = dataWeb;
      if (buscar) {
        console.log(buscar);
        this.registros = this.registros.filter((registro) =>
          registro.cedula.toLowerCase().includes(buscar.toLowerCase())
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
    this.usuarioService.eliminarUsuario(id).subscribe(() => {
      console.log(id);
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
    if (formData.cedula) {
      const usuario = { ...formData };
      console.log('Entro al ID');
      console.log(usuario);
      this.usuarioService
        .actualizarUsuario(formData.cedula, usuario)
        .subscribe(() => {
          this.cargarClientes('');
          this.formulario = false;
          this.mostrarMensajeActualizacion();
        });
    } else {
      const usuario = { ...formData };
      this.usuarioService.registrarUsuario(usuario).subscribe(() => {
        console.log('Dentro regsitrar');
        console.log(usuario);
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
