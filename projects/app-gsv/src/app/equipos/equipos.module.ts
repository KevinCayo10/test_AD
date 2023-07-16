import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquiposRoutingModule } from './equipos-routing.module';
import { FormComponent } from './components/form/form.component';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';
import { TableEquiposComponent } from './components/table-equipos/table-equipos.component';

@NgModule({
  declarations: [FormComponent, PageListComponent, TableEquiposComponent],
  imports: [CommonModule, EquiposRoutingModule, SharedModule],
})
export class EquiposModule {}
