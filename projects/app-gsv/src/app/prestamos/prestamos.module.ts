import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrestamosRoutingModule } from './prestamos-routing.module';
import { FormComponent } from './components/form/form.component';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';
import { TablePrestamosComponent } from './components/table-prestamos/table-prestamos.component';

@NgModule({
  declarations: [FormComponent, PageListComponent, TablePrestamosComponent],
  imports: [CommonModule, PrestamosRoutingModule, SharedModule],
})
export class PrestamosModule {}
