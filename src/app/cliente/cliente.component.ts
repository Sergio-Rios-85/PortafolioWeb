import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  contacto = {
    nombre: '',
    correo: '',
    mensaje: ''
  };

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/cliente']);
    }
  }

  async enviarContacto() {
    try {
      const response = await this.http.post('http://localhost:4000/contacto', this.contacto).toPromise();
      alert('Su mensaje ha sido enviado exitosamente.');
      this.contacto = { nombre: '', correo: '', mensaje: '' };
    } catch (error) {
      alert('Hubo un error al enviar el mensaje.');
    }
  }
}
