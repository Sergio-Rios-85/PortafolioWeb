import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busqueda-veh-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busqueda-veh-cliente.component.html',
  styleUrls: ['./busqueda-veh-cliente.component.css']
})
export class BusquedaVehClienteComponent {
  PATENTE: string = '';
  vehiculos: any[] = [];

  constructor(private http: HttpClient) { }

  validarPatente(patente: string): boolean {
    // Aquí puedes definir la lógica de validación de la patente
    const regex = /^[A-Z]{4}\d{2}$/; 
    return regex.test(patente);
  }

  buscarVehiculos() {
    const errorMessage = document.getElementById('error-message');
  
    if (!this.validarPatente(this.PATENTE)) {
      if (errorMessage) {
        errorMessage.style.display = 'block';
      }
      return;
    }
  
    if (errorMessage) {
      errorMessage.style.display = 'none';
    }
  
    const filtros = {
      PATENTE: this.PATENTE
    };
  
    this.http.post<any[]>('http://localhost:4000/buscar-vehiculos', filtros).subscribe(
      data => {
        console.log(data); // Verifica los datos recibidos
        this.vehiculos = data;
      },
      error => {
        console.error('Error al buscar vehículos:', error);
        alert('Error al buscar vehículos');
      }
    );
  }
  
  
}
