import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { FormComponent } from './components/form/form.component';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';
import { TableUsersComponent } from './components/table-users/table-users.component';

@NgModule({
  declarations: [FormComponent, PageListComponent, TableUsersComponent],
  imports: [CommonModule, UsuariosRoutingModule, SharedModule],
})
export class UsuariosModule {}
