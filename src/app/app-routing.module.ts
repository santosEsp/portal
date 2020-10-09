import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {LoginComponent} from './components/Login/login.component';
import {ContactosComponent} from './components/pages/contactos/contactos.component';
import { EmpresaComponent } from './components/pages/empresa/empresa.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { InformesComponent } from './components/pages/informes/informes.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { PipelineComponent } from './components/pages/pipeline/pipeline.component';


const routes: Routes = [

  {path: 'Contactos', component: ContactosComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Empresas', component: EmpresaComponent},
  {path: 'Perfil', component: PerfilComponent},
  {path: 'Informes', component: InformesComponent},
  {path: 'Usuarios', component: UsuariosComponent},
  {path: 'Pipeline', component: PipelineComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'Login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
