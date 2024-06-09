import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PageUsuarioComponent } from './page-usuario/page-usuario.component'; 
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component'; 
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { InspeccionComponent } from './inspeccion/inspeccion.component';
import { OiComponent } from './inspeccion/oi/oi.component';
import { DocumentoComponent } from './inspeccion/documento/documento.component';
import { LoginClienteComponent } from './login-cliente/login-cliente.component';
import { RegistroComponent } from './registro/registro.component';
import { BusquedaVehClienteComponent } from './busqueda-veh-cliente/busqueda-veh-cliente.component';
import { PageClienteComponent } from './page-cliente/page-cliente.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { OlvidarContrasenaComponent } from './olvidar-contrasena/olvidar-contrasena.component';
import { ReservarComponent } from './reservar/reservar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'cliente', component: ClienteComponent },
  { path: 'login-usuario', component: LoginUsuarioComponent },
  { path: '', redirectTo: 'login-usuario', pathMatch: 'full' },
  { path: 'page-usuario', component: PageUsuarioComponent },
  { path: 'vehiculo', component: VehiculoComponent },
  { path: 'inspeccion', component: InspeccionComponent },
  { path: 'inspeccion/oi', component: OiComponent },
  { path: 'inspeccion/documento', component: DocumentoComponent },
  { path: 'login-cliente', component: LoginClienteComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '', redirectTo: '/registro', pathMatch: 'full' },
  { path: 'busqueda-veh-cliente', component: BusquedaVehClienteComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'page-cliente', component: PageClienteComponent },
  { path: 'olvidar-contrasena', component: OlvidarContrasenaComponent },
  { path: 'reservar', component: ReservarComponent },
  { path: '**', redirectTo: 'page-usuario', pathMatch: 'full' }
];
