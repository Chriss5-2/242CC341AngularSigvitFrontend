import { Component } from '@angular/core';
import { ProductoService } from '../../service/producto.service';
import { IProductoResponse } from '../../model/producto-response';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './registrar-producto.component.html',
  styleUrl: './registrar-producto.component.css'
})
export class RegistrarProductoComponent {
  title = 'Registrar Producto';
  productoArray: IProductoResponse[]=[];
  page:number=1;
  productoForm:FormGroup;

  constructor(private productoService:ProductoService){
    this.productoForm = new FormGroup({
      idProducto: new FormControl(''),
      nombre: new FormControl('', [Validators.required,Validators.minLength(2)]),
      precioVenta: new FormControl(''),
      stock: new FormControl(''),
      categoriaNombre: new FormControl('', [Validators.required,Validators.minLength(2)]),
      categoriaDescripcion: new FormControl('', [Validators.required,Validators.minLength(2)]),
    });
  }
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

  editarProducto(productoResponse: IProductoResponse):void{console.log('editando persona');}

  eliminarProducto(productoResponse: IProductoResponse):void{console.log('eliminando producto')}

  

}
