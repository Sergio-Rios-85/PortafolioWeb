import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-page-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule // Añade esta línea
  ],
  templateUrl: './page-usuario.component.html',
  styleUrls: ['./page-usuario.component.css']
})
export class PageUsuarioComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
