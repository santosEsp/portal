import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';


import { LoginComponent } from './components/Login/login.component';
import { EmpresaComponent } from './components/pages/empresa/empresa.component';
import { ContactosComponent } from './components/pages/contactos/contactos.component';
import { PipelineComponent } from './components/pages/pipeline/pipeline.component';
import { NavbarComponent } from './components/pages/navbar/navbar.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { InformesComponent } from './components/pages/informes/informes.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { ConfiguracionComponent } from './components/pages/configuracion/configuracion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmpresaComponent,
    ContactosComponent,
    PipelineComponent,
    NavbarComponent,
    PerfilComponent,
    InformesComponent,
    UsuariosComponent,
    ConfiguracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
