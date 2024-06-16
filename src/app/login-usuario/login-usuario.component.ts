import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {
  usuario!: string;
  contrasena!: string;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    console.log('Usuario:', this.usuario);
    console.log('Contraseña:', this.contrasena);

    const data = {
      usuario: this.usuario,
      contrasena: this.contrasena,
    };

    this.http.post<any>('http://localhost:4000/login-usuario', data).subscribe(
      (response) => {
        alert(response.message);
        if (response.message === 'Inicio de sesión exitoso') {
          this.authService.login();
          localStorage.setItem('usuarioId', response.usuarioId);
          this.router.navigate(['/page-usuario']);
        }
      },
      (error) => {
        console.error('Error:', error);
        alert('Credenciales incorrectas');
      }
    );
  }
}
