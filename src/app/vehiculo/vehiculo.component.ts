import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehiculo',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent {
  PATENTE!: string;
  MOTOR!: string;
  CHASIS!: string;
  KILOMETRAJE!: number;
  ID_MARCA!: number;
  ID_MODELO!: number;
  ID_COLOR!: number;
  ID_ANIO!: number;

  marcas: any[] = [];
  modelos: any[] = [];
  colores: any[] = [];
  anios: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Obtener datos para los select de marca, modelo, color y año
    this.http.get<any[]>('http://localhost:4000/marcas').subscribe(data => {
      this.marcas = data;
    });

    this.http.get<any[]>('http://localhost:4000/modelos').subscribe(data => {
      this.modelos = data;
    });

    this.http.get<any[]>('http://localhost:4000/colores').subscribe(data => {
      this.colores = data;
    });

    this.http.get<any[]>('http://localhost:4000/anios').subscribe(data => {
      this.anios = data;
    });
  }

  guardarVehiculo() {
    // Validaciones
    if (!this.PATENTE || !this.MOTOR || !this.CHASIS || this.KILOMETRAJE == null || this.ID_MARCA == null || this.ID_MODELO == null || this.ID_COLOR == null || this.ID_ANIO == null) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }
    if (this.KILOMETRAJE <= 0) {
      alert('El kilometraje debe ser un valor positivo.');
      return;
    }

    const vehiculo = {
      PATENTE: this.PATENTE,
      MOTOR: this.MOTOR,
      CHASIS: this.CHASIS,
      KILOMETRAJE: this.KILOMETRAJE,
      VEH_MARCA: this.ID_MARCA,
      VEH_MODELO: this.ID_MODELO,
      VEH_COLOR: this.ID_COLOR,
      VEH_ANIO: this.ID_ANIO
    };

    this.http.post<any>('http://localhost:4000/vehiculo', vehiculo).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        if (response.message === 'Registro exitoso') {
          alert('Vehículo registrado con éxito');
          this.router.navigate(['/page-usuario']);
        } else {
          alert('Error al registrar el vehículo');
        }
      },
      (error) => {
        console.error('Error:', error);
        alert('Error en el servidor');
      }
    );
  }
}
