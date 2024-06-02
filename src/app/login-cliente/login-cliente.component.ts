import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    const data = {
      correo: this.correo,
      contrasena: this.contrasena,
    };

    this.http.post<any>('http://localhost:4000/login-cliente', data).subscribe(
      (response) => {
        alert(response.message);
        if (response.message === 'Inicio de sesión exitoso') {
          localStorage.setItem('clienteId', response.clienteId);
          this.router.navigate(['/page-cliente']);
        }
      },
      (error) => {
        console.error('Error:', error);
        alert('Error en el servidor');
      }
    );
  }
}
