import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/Login/login.component';
import {ContactosComponent} from './components/pages/contactos/contactos.component';
import { EmpresaComponent } from './components/pages/empresa/empresa.component';
import { InformacionComponent } from './components/pages/informacion/informacion.component';
import { InformesComponent } from './components/pages/informes/informes.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { ConfiguracionComponent } from './components/pages/configuracion/configuracion.component';
import { AuthGuard } from './guards/auth.guard';
import { PipelineComponent } from './components/pages/pipeline/pipeline.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'contactos', component: ContactosComponent, canActivate:[AuthGuard] },
  {path: 'empresas', component: EmpresaComponent,  canActivate:[AuthGuard]},
  {path: 'informacion/:tipo/:id', component: InformacionComponent, canActivate:[AuthGuard]},
  {path: 'informes', component: InformesComponent, canActivate:[AuthGuard]},
  {path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard]},
  {path: 'pipeline', component: PipelineComponent, canActivate:[AuthGuard]},
  {path: 'configuracion', component: ConfiguracionComponent, canActivate:[AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
