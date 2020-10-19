import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { UsuarioModel } from 'src/app/models/usuarios.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   
   usuario : UsuarioModel;

  constructor(private _loginService: LoginService, private router: Router) { 
    this.usuario = JSON.parse(localStorage.getItem('usuario'));        
  }

  ngOnInit(): void {

  }

  salir() {
    this._loginService.logout();
    this.router.navigateByUrl('/login');
  }


}
