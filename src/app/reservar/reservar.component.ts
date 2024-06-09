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
  ID_VEHICULO!: number;
  ID_MARCA!: number;
  ID_MODELO!: number;
  ID_ANIO!: number;
  HORA!: string;
  selectedTimeSlot!: TimeSlot;

  regiones: any[] = [];
  sucursales: any[] = [];
  availableTimes: TimeSlot[] = [];
  selectedRegion!: number;
  selectedSucursal!: number;
  selectedDate!: string;
  patentes: any[] = [];
  marcas: any[] = [];
  modelos: any[] = [];
  anios: any[] = [];

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
      const formattedDate = new Date(this.selectedDate).toISOString().split('T')[0]; // Formatear la fecha a YYYY-MM-DD
      this.http.get<TimeSlot[]>(`http://localhost:4000/available-times?date=${formattedDate}`).subscribe(data => {
        console.log('Horarios disponibles:', data);
        this.availableTimes = data;
      }, error => {
        console.error('Error al cargar horarios disponibles:', error);
      });
    }
  }

  selectTime(time: TimeSlot) {
    this.selectedTimeSlot = time; // Asigna el horario seleccionado
    this.HORA = time.HORA;
  }

  cargarDatos() {
    this.http.get<any[]>('http://localhost:4000/patentes').subscribe(data => {
      this.patentes = data;
    });

    this.http.get<any[]>('http://localhost:4000/marcas').subscribe(data => {
      this.marcas = data;
    });

    this.http.get<any[]>('http://localhost:4000/modelos').subscribe(data => {
      this.modelos = data;
    });

    this.http.get<any[]>('http://localhost:4000/anios').subscribe(data => {
      this.anios = data;
    });
  }

  reservar() {
    if (this.ID_VEHICULO == null || this.ID_MARCA == null || this.ID_MODELO == null || this.ID_ANIO == null || this.HORA == null) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    const reservation = {
      FECHA: this.selectedDate,
      SUCURSAL: this.selectedSucursal,
      HORA: this.HORA,
      VEH_PATENTE: this.ID_VEHICULO, // Asegúrate de que estás enviando la patente del vehículo
      VEH_MARCA: this.ID_MARCA,
      VEH_MODELO: this.ID_MODELO,
      VEH_ANIO: this.ID_ANIO
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