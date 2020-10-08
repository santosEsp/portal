import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';


import { LoginComponent } from './components/Login/login.component';
import { EmpresaComponent } from './components/pages/empresa/empresa.component';
import { ContactosComponent } from './components/pages/contactos/contactos.component';
import { PipelineComponent } from './components/pages/pipeline/pipeline.component';
import { NavbarComponent } from './components/pages/navbar/navbar.component';
import { InformacionComponent } from './components/pages/informacion/informacion.component';
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
    InformacionComponent,
    InformesComponent,
    UsuariosComponent,
    ConfiguracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
