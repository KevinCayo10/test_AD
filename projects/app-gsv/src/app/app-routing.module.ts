import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'usuario',
    loadChildren: () =>
      import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },
  {
    path: 'equipo',
    loadChildren: () =>
      import('./equipos/equipos.module').then((m) => m.EquiposModule),
  },
  {
    path: 'prestamo',
    loadChildren: () =>
      import('./prestamos/prestamos.module').then((m) => m.PrestamosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
