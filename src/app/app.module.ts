import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Login/login.component';
import { EmpresaComponent } from './components/pages/empresa/empresa.component';

import { ContactosComponent } from './components/pages/contactos/contactos.component';
import { PipelineComponent } from './components/pages/pipeline/pipeline.component';
import { NavbarComponent } from './components/pages/navbar/navbar.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmpresaComponent,
    ContactosComponent,
    PipelineComponent,
    NavbarComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
