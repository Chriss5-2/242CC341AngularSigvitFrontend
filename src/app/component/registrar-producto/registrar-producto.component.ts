import { Component } from '@angular/core';
import { ProductoService } from '../../service/producto.service';
import { IProductoResponse } from '../../model/producto-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registrar-producto.component.html',
  styleUrl: './registrar-producto.component.css'
})
export class RegistrarProductoComponent {
  title = '242CC341AAngularSiRegistrarProductoComponentgconFrontend';
  productoArray: IProductoResponse[]=[];
  constructor(private productoService:ProductoService){}
  ngOnInit():void{
    this.getProductos();
  }
  getProductos():void{
    this.productoService.getProductos().subscribe((result:any)=>{
      console.log('Result',result);
      this.productoArray=result;
      console.log(this.productoArray);
    });
  }

}
