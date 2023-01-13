import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

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
import { ListarRotaComponent } from './listar-rota/listar-rota.component';
import { LoginComponent } from './login/login.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { CriarPlaneamentoComponent } from './criar-planeamento/criar-planeamento.component';
import { ListarPlaneamentoComponent } from './listar-planeamento/listar-planeamento.component';
//import { ExComponent } from './ex/ex.component';

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
    RedeViariaComponent,
    ListarRotaComponent,
    LoginComponent,
    CriarPlaneamentoComponent,
    ListarPlaneamentoComponent
    //ExComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
    Ng2OrderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
