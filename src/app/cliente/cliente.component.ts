import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  contacto = {
    nombre: '',
    correo: '',
    mensaje: ''
  };

  constructor(private router: Router, private http: HttpClient) {}

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
