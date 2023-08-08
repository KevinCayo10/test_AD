import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrarRoutingModule } from './borrar-routing.module';
import { PageListComponent } from './page/page-list/page-list.component';


@NgModule({
  declarations: [
    PageListComponent
  ],
  imports: [
    CommonModule,
    BorrarRoutingModule
  ]
})
export class BorrarModule { }
