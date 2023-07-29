import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { InicioComponent } from './components/dashboard/inicio/inicio.component';



import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import{HttpClientModule} from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar'; // Asegúrate de importar MatToolbarModule
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RegistroComponent } from './components/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,

  ],
  imports: [
    BrowserModule,
 InicioComponent ,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
     FormsModule,
     BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    
    MatSidenavModule,
    MatIconModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
