import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
//import { UsuariosComponent } from './usuarios/usuarios.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { ClientesComponent } from './clientes/clientes.component';
import { AutoresComponent } from './autores/autores.component';
import { LibrosComponent } from './libros/libros.component';
import { BarralateralComponent } from './barralateral/barralateral.component';
//import { ReportesComponent } from './reportes/reportes.component';
import { FormsModule } from '@angular/forms'; // <-- Importa el módulo FormsModule

@NgModule({
  declarations: [
    DashboardComponent,
   // UsuariosCompo]nent,
    
    NavbarComponent,
    ClientesComponent,
    AutoresComponent,
    BarralateralComponent,
    //ReportesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    InicioComponent,
    FormsModule,
    LibrosComponent,

  ]
})
export class DashboardModule { }
