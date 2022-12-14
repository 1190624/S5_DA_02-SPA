import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { CriarCamiaoComponent } from './criar-camiao/criar-camiao.component';
import { HttpClientModule } from '@angular/common/http';
import { CriarArmazemComponent } from './criar-armazem/criar-armazem.component';
import { CriarEntregaComponent } from './criar-entrega/criar-entrega.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListarCamiaoComponent } from './listar-camiao/listar-camiao.component';
import { ListarArmazemComponent } from './listar-armazem/listar-armazem.component';
import { ListarEntregaComponent } from './listar-entrega/listar-entrega.component';
import { SharedModule } from './shared';
import { CriarRotaComponent } from './criar-rota/criar-rota.component';
import { RedeViariaComponent } from './rede-viaria/rede-viaria.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuHeaderComponent,
    CriarCamiaoComponent,
    CriarArmazemComponent,
    CriarEntregaComponent,
    DashboardComponent,
    ListarCamiaoComponent,
    ListarEntregaComponent,
    ListarArmazemComponent,
    CriarRotaComponent,
    RedeViariaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
