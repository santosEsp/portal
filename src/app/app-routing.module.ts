import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {LoginComponent} from './components/Login/login.component';
import {ContactosComponent} from './components/pages/contactos/contactos.component';
import { EmpresaComponent } from './components/pages/empresa/empresa.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { InformesComponent } from './components/pages/informes/informes.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';


const routes: Routes = [
  {path: 'contactos', component: ContactosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'empresas', component: EmpresaComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'informes', component: InformesComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
