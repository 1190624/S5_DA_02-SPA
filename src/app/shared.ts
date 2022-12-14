import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterPipe} from "./model/filterPipe";
// ...


@NgModule({
  imports: [
    // Modules
    CommonModule,
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