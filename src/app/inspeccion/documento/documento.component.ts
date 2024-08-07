import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-documento',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent {
  searchPatente!: string;
  inspecciones: any[] = [];
  inspeccionSeleccionada: any;
  selectedImage: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  errorPatente: boolean = false;
  errorMessage: string = 'Formato de patente incorrecto. Por favor, ingrese una patente válida.';

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  validarPatente(patente: string): boolean {
    const regex = /^[A-Z]{4}\d{2}$/; 
    return regex.test(patente);
  }

  buscarInspecciones() {
    if (!this.validarPatente(this.searchPatente)) {
      this.errorPatente = true;
      return;
    }

    this.errorPatente = false;

    this.http.get<any[]>('http://localhost:4000/inspecciones').subscribe(
      data => {
        this.inspecciones = data.filter(inspeccion => {
          const patente = inspeccion.INSP_PATENTE || '';
          return patente.includes(this.searchPatente);
        });
        console.log('Inspecciones encontradas:', this.inspecciones);
      },
      error => {
        console.error('Error al buscar inspecciones', error);
      }
    );
  }

  onInspeccionClick(inspeccion: any) {
    console.log('Item clicked:', inspeccion); 
    this.seleccionarInspeccion(inspeccion);
  }

  seleccionarInspeccion(inspeccion: any) {
    this.inspeccionSeleccionada = inspeccion;
    console.log('Inspección seleccionada:', this.inspeccionSeleccionada); 
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = e => this.selectedImage = reader.result;
      reader.readAsDataURL(this.imageFile);
    }
  }

  generarPDF() {
    if (!this.inspeccionSeleccionada) {
      alert('Por favor, seleccione una inspección primero.');
      return;
    }

    console.log('Generando PDF para la inspección:', this.inspeccionSeleccionada);

    const formData = new FormData();
    formData.append('inspeccion', JSON.stringify(this.inspeccionSeleccionada));
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.http.post('http://localhost:4000/generate-pdf', formData, { responseType: 'blob' }).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, `Inspeccion_${this.inspeccionSeleccionada.FECHA}_${this.inspeccionSeleccionada.HORA}.pdf`);
        console.log('PDF generado y descargado.');
      },
      (error) => {
        console.error('Error al generar el PDF', error);
      }
    );
  }
}
