import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrarProductoComponent } from './component/registrar-producto/registrar-producto.component';
import { NavbarComponent } from "./component/navbar/navbar.component";
import { RegistrarClienteComponent } from './component/registrar-cliente/registrar-cliente.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '242CC341AngularSigvitFrontend';
}
