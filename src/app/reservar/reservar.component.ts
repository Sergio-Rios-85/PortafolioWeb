import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface TimeSlot {
  HORA: string;
  BOOKED: boolean;
}

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent {
  selectedPatente!: string;
  selectedMarca!: string;
  selectedModelo!: string;
  selectedAnio!: number;
  HORA!: string;
  selectedTimeSlot!: TimeSlot;

  regiones: any[] = [];
  sucursales: any[] = [];
  availableTimes: TimeSlot[] = [];
  selectedRegion!: number;
  selectedSucursal!: number;
  selectedDate!: string;
  patentes: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadRegiones();
    this.cargarDatos();
  }

  loadRegiones() {
    this.http.get<any[]>('http://localhost:4000/regiones').subscribe(data => {
      this.regiones = data;
    });
  }

  loadSucursales() {
    if (this.selectedRegion) {
      this.http.get<any[]>(`http://localhost:4000/sucursales/${this.selectedRegion}`).subscribe(data => {
        this.sucursales = data;
      }, error => {
        console.error('Error al cargar sucursales:', error);
      });
    }
  }

  loadAvailableTimes() {
    if (this.selectedDate) {
      const formattedDate = new Date(this.selectedDate).toISOString().split('T')[0];
      this.http.get<TimeSlot[]>(`http://localhost:4000/available-times?date=${formattedDate}`).subscribe(data => {
        this.availableTimes = data;
      }, error => {
        console.error('Error al cargar horarios disponibles:', error);
      });
    }
  }

  selectTime(time: TimeSlot) {
    this.selectedTimeSlot = time;
    this.HORA = time.HORA;
  }

  cargarDatos() {
    this.http.get<any[]>('http://localhost:4000/patentes').subscribe(data => {
      this.patentes = data;
    });
  }

  loadVehicleData() {
    this.http.get<any>(`http://localhost:4000/vehiculo/${this.selectedPatente}`).subscribe(data => {
      this.selectedMarca = data.MARCA;
      this.selectedModelo = data.MODELO;
      this.selectedAnio = data.ANIO;
    }, error => {
      console.error('Error al cargar datos del vehículo:', error);
    });
  }

  reservar() {
    if (!this.selectedPatente || !this.selectedMarca || !this.selectedModelo || !this.selectedAnio || !this.HORA) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    const reservation = {
      FECHA: this.selectedDate,
      SUCURSAL: this.selectedSucursal,
      HORA: this.HORA,
      RE_PATENTE: this.selectedPatente,
      RE_MARCA: this.selectedMarca,
      RE_MODELO: this.selectedModelo,
      RE_ANIO: this.selectedAnio
    };

    this.http.post('http://localhost:4000/reservar', reservation).subscribe(
      response => {
        alert('Reserva exitosa');
        this.router.navigate(['/page-usuario']);
      },
      error => {
        alert('Error al realizar la reserva');
      }
    );
  }
}
