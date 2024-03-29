import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { CriarCamiaoComponent } from './criar-camiao/criar-camiao.component';
import { CriarArmazemComponent } from './criar-armazem/criar-armazem.component';
import { AppComponent } from './app.component';
import { CriarEntregaComponent } from './criar-entrega/criar-entrega.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListarCamiaoComponent } from './listar-camiao/listar-camiao.component';
import { ListarEntregaComponent } from './listar-entrega/listar-entrega.component';
import { ListarArmazemComponent } from './listar-armazem/listar-armazem.component';
import { CriarRotaComponent } from './criar-rota/criar-rota.component';
import { RedeViariaComponent } from './rede-viaria/rede-viaria.component';
import { ListarRotaComponent } from './listar-rota/listar-rota.component';
import { LoginComponent } from './login/login.component';
import { CriarPlaneamentoComponent } from './criar-planeamento/criar-planeamento.component';
import { ListarPlaneamentoComponent } from './listar-planeamento/listar-planeamento.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'appRoot', component: AppComponent},
  {path: 'adicionarCamiao', component: CriarCamiaoComponent},
  {path: 'adicionarArmazem', component: CriarArmazemComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'adicionarEntrega', component: CriarEntregaComponent},
  {path: 'listarCamiao' , component: ListarCamiaoComponent},
  {path: 'listarEntrega', component: ListarEntregaComponent},
  {path: 'listarArmazem', component: ListarArmazemComponent},
  {path: 'listarRota', component: ListarRotaComponent},
  {path: 'criarRota', component: CriarRotaComponent},
  {path: 'redeViaria', component: RedeViariaComponent},
  {path: 'login', component: LoginComponent },
  {path: 'criarPlaneamento', component: CriarPlaneamentoComponent},
  {path: 'listarPlaneamento', component: ListarPlaneamentoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    NgxPaginationModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
