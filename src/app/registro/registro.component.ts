import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import validator from 'validator';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  RUT_CLIENTE!: string;
  NOMBRES_CLIENTE!: string;
  AP_PATERNO_CLIENTE!: string;
  AP_MATERNO_CLIENTE!: string;
  TELEFONO_FIJO!: string;
  CELULAR_CLIENTE!: string;
  CORREO_CLIENTE!: string;
  DIRECCION_CLIENTE!: string;
  CONTRASENA!: string;

  telefonoFijoError: boolean = false;
  celularClienteError: boolean = false;
  correoClienteError: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() { }

  registro() {
    if (!this.validarCorreo(this.CORREO_CLIENTE)) {
      this.correoClienteError = true;
      return;
    }

    if (!this.validarTelefono(this.TELEFONO_FIJO) || !this.validarTelefono(this.CELULAR_CLIENTE)) {
      alert('Por favor ingrese solo números en los campos de teléfono.');
      return;
    }

    const data = {
      RUT_CLIENTE: this.RUT_CLIENTE,
      NOMBRES_CLIENTE: this.NOMBRES_CLIENTE,
      AP_PATERNO_CLIENTE: this.AP_PATERNO_CLIENTE,
      AP_MATERNO_CLIENTE: this.AP_MATERNO_CLIENTE,
      TELEFONO_FIJO: this.TELEFONO_FIJO,
      CELULAR_CLIENTE: this.CELULAR_CLIENTE,
      CORREO_CLIENTE: this.CORREO_CLIENTE,
      DIRECCION_CLIENTE: this.DIRECCION_CLIENTE,
      CONTRASENA: this.CONTRASENA,
    };

    this.http.post<any>('http://localhost:4000/registro', data).subscribe(
      (response) => {
        alert(response.message);
        if (response.message === 'Registro exitoso') {
          this.router.navigate(['/login-cliente']);
        }
      },
      (error) => {
        console.error('Error:', error);
        alert('Error en el servidor');
      }
    );
  }

  validarCorreo(correo: string): boolean {
    const isValid = validator.isEmail(correo);
    this.correoClienteError = !isValid;
    return isValid;
  }

  validarTelefono(telefono: string): boolean {
    const isValid = /^[0-9]*$/.test(telefono);
    if (telefono === this.TELEFONO_FIJO) {
      this.telefonoFijoError = !isValid;
    } else if (telefono === this.CELULAR_CLIENTE) {
      this.celularClienteError = !isValid;
    }
    return isValid;
  }
}
