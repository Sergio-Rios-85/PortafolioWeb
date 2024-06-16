import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})
export class LoginClienteComponent {
  correo!: string;
  contrasena!: string;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  login() {
    const data = {
      correo: this.correo,
      contrasena: this.contrasena,
    };

    this.http.post<any>('http://localhost:4000/login-cliente', data).subscribe(
      (response) => {
        alert(response.message);
        if (response.message === 'Inicio de sesión exitoso') {
          this.authService.login();
          localStorage.setItem('clienteId', response.clienteId);
          this.router.navigate(['/page-cliente']);
        } else {
          alert('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error:', error);
        alert('Credenciales incorrectas');
      }
    );
  }
}
