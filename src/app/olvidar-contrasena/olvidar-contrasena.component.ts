import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-olvidar-contrasena',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './olvidar-contrasena.component.html',
  styleUrl: './olvidar-contrasena.component.css'
})
export class OlvidarContrasenaComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

 

  resetPassword() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    const data = { email: this.email, password: this.password };
    this.http.post('http://localhost:4000/api/reset-password', data)
      .subscribe(response => {
        alert('Contraseña restablecida con éxito');
        this.router.navigate(['/login-cliente']);
      }, error => {
        alert('Error al restablecer la contraseña');
      });
  }
  
}
