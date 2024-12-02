import { Routes } from '@angular/router';
import { RegistrarProductoComponent } from './component/registrar-producto/registrar-producto.component';
import { InicioComponent } from './component/inicio/inicio.component';

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch:'full'},
    { path: 'inicio', component:InicioComponent},
    { path: 'registrar-producto', component: RegistrarProductoComponent},
];
