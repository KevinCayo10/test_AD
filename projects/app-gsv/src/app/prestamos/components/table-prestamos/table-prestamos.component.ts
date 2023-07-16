import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatColumnDef, MatTable } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MetaDataColumn } from '../../../shared/interfaces/metadatacolumn.interface';
import { EquipoService } from '../../../equipos/services/equipo.service';
import { UsuarioService } from '../../../usuarios/services/usuario.service';

@Component({
  selector: 'gsv-table-prestamos',
  templateUrl: './table-prestamos.component.html',
  styleUrls: ['./table-prestamos.component.css'],
})
export class TablePrestamosComponent {
  @Input() data: any;
  @Input() metaDataColumns!: MetaDataColumn[];
  @Input() title: any;

  //OUTPUT
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickEliminar: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickAprobar: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickRechazar: EventEmitter<any> = new EventEmitter<any>();

  columns: string[] = [];
  newData!: any;
  equipos!: any;
  usuarios!: any;

  @ContentChildren(MatColumnDef, { descendants: true })
  columnsDef!: QueryList<MatColumnDef>;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  pendiente!: boolean;
  aprobar!: boolean;
  rechazar!: boolean;

  constructor(
    private serviceEquipo: EquipoService,
    private serviceUsuario: UsuarioService
  ) {
    //this.crearNuevaData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metaDataColumns']) {
      this.columns = this.metaDataColumns.map((x) => x.field);
    }
  }

  crearNuevaData() {
    this.data.forEach((data: any) => {
      const id_equipo_per = this.serviceEquipo
        .cargarEquipo(data.id_equipo_per)
        .subscribe((resp) => {
          return resp.nombre;
        });

      const usuario_presta = this.usuarios.find((user: any) => {
        return user.id_usuario === data.id_usuario_presta_per;
      });

      const id_usuario_presta_per = `${usuario_presta.nombre} ${usuario_presta.apellido}`;

      const usuario_solicita = this.usuarios.find((user: any) => {
        return user.id_usuario === data.id_usuario_solicita_per;
      });

      const id_usuario_solicita_per = `${usuario_solicita.nombre} ${usuario_solicita.apellido}`;

      this.newData.push({
        id_prestamo: data.id_prestamo,
        id_equipo_per: id_equipo_per,
        fecha_prestamo: data.fecha_prestamo,
        fecha_devolucion: data.fecha_devolucion,
        id_usuario_presta_per: id_usuario_presta_per,
        id_usuario_solicita_per: id_usuario_solicita_per,
        observaciones: data.observaciones,
        estado: data.estado,
      });
      console.log(this.newData);
    });
  }
  accionEditar(row: any) {
    this.onClick.emit(row);
  }

  accionAprobar(row: any) {
    this.onClickAprobar.emit(row);
  }

  accionRechazar(row: any) {
    this.onClickRechazar.emit(row);
  }

  accionEliminar(id: any) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este elemento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Código para eliminar el elemento
        this.onClickEliminar.emit(id);
        return;
      }
    });
  }

  mensaje(mensaje: string): void {
    Swal.fire({
      title: mensaje,
      icon: 'info',
      timer: 3000,
      showConfirmButton: false,
    });
  }
}
