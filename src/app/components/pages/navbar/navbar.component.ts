import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { ConsultasService } from '../../../services/consultas.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nombreUsuario: string;
  correo: string;
  constructor(private auth: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');

  }


}
