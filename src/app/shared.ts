import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterPipe} from "./model/filterPipe";
import { NgxPaginationModule } from 'ngx-pagination';
// ...


@NgModule({
  imports: [
    // Modules
    CommonModule,
    NgxPaginationModule,
  ],

  declarations: [
    // Components &amp; directives
    FilterPipe,
  ],

  providers: [
    // Services
  ],

  exports: [
    // ...
    FilterPipe,
  ],
})
export class SharedModule {}