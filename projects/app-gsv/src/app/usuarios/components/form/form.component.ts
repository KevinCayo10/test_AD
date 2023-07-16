import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'gsv-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  titulo = '';

  formulario!: FormGroup;

  @Input() data!: any;
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter();
  @Output() formularioCerrado: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.formulario = new FormGroup({
      id_usuario: new FormControl(this.data?.id_usuario),
      cedula: new FormControl(this.data?.cedula, Validators.required),
      nombre: new FormControl(this.data?.nombre, Validators.required),
      apellido: new FormControl(this.data?.apellido, Validators.required),
      correo: new FormControl(this.data?.correo, Validators.required),
      contrasena: new FormControl(this.data?.contrasena, Validators.required),
      rol: new FormControl(this.data?.rol, Validators.required),
    });
  }
  grabar() {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      console.log(formData);
      this.formularioEnviado.emit(formData);
    }
  }

  cerrarFormulario() {
    this.formularioCerrado.emit();
  }
}
