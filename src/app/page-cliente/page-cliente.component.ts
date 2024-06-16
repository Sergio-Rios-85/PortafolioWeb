import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-page-cliente',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './page-cliente.component.html',
  styleUrl: './page-cliente.component.css'
})
export class PageClienteComponent {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-cliente']);
    }
  }
}
