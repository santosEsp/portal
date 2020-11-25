import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';

// Graficos
import { ChartsModule } from 'ng2-charts';

// componentes
import { LoginComponent } from './components/Login/login.component';
import { EmpresaComponent } from './components/pages/empresa/empresa.component';
import { ContactosComponent } from './components/pages/contactos/contactos.component';
import { NavbarComponent } from './components/pages/navbar/navbar.component';
import { InformacionComponent } from './components/pages/informacion/informacion.component';
import { InformesComponent } from './components/pages/informes/informes.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { ConfiguracionComponent } from './components/pages/configuracion/configuracion.component';
import { from } from 'rxjs';
import { NegocioComponent } from './components/pages/negocios/negocios.component';

//servicios
import { InformesService } from './services/informes/informes.service';
import { ModalSharedComponent } from './components/modal-shared/modal-shared.component';
import { InformacionEmpresaComponent } from './components/pages/informacion-empresa/informacion-empresa.component';



import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/daygrid'; // a plugin

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmpresaComponent,
    ContactosComponent,
    NavbarComponent,
    InformacionComponent,
    InformesComponent,
    UsuariosComponent,
    ConfiguracionComponent,
    NegocioComponent,
    ModalSharedComponent,
    InformacionEmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
