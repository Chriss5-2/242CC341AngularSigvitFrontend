import { Component } from '@angular/core';
import { ProductoService } from '../../service/producto.service';
import { IProductoResponse } from '../../model/producto-response';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IProductoRequest } from '../../model/producto-request';
import Swal from 'sweetalert2';

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
  productoRequest:IProductoRequest={} as IProductoRequest;

  constructor(private productoService:ProductoService){
    this.productoForm = new FormGroup({
      idProducto: new FormControl('1'),
      descripcion: new FormControl('', [Validators.required,Validators.minLength(2)]),
      nombre: new FormControl('', [Validators.required,Validators.minLength(2)]),
      precioVenta: new FormControl('1',[Validators.required, Validators.min(1)]),
      precioCompra: new FormControl('1',[Validators.required, Validators.min(1)]),
      stock: new FormControl('1',[Validators.required, Validators.min(1)]),
      idCategoria: new FormControl('',[Validators.required,Validators.minLength(2)]),
      rucProveedor: new FormControl('', [Validators.required,Validators.minLength(2)]),
      imagen: new FormControl('', [Validators.required,Validators.minLength(2)]),
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
  setProducto():void{
    this.productoRequest.idProducto=this.productoForm.get('idProducto')?.value;
    this.productoRequest.descripcion=this.productoForm.get('descripcion')?.value;
    this.productoRequest.nombre=this.productoForm.get('nombre')?.value;
    this.productoRequest.precioVenta=this.productoForm.get('precioVenta')?.value;
    this.productoRequest.precioCompra=this.productoForm.get('precioCompra')?.value;
    this.productoRequest.stock=this.productoForm.get('stock')?.value;
    this.productoRequest.idCategoria=this.productoForm.get('idCategoria')?.value;
    this.productoRequest.rucProveedor=this.productoForm.get('rucProveedor')?.value;
    this.productoRequest.imagen=this.productoForm.get('imagen')?.value;

  }

  registrarProducto():void{
    console.log('registrando Producto');
    this.setProducto();
    this.productoService.registrarProducto(this.productoRequest).subscribe((result: any)=>{
      console.log('registrarProducto',result),
      this.ngOnInit();
      Swal.close();
      Swal.fire({
        icon:'success',
        title:'registrarProducto....',
        text:'Se registro existosamente el producto',
    });
    },(err:any)=>{
      Swal.close();
      Swal.fire({
        icon:'error',
        title:'Advertencia.....',
        text:'Ah ocurrido un error al registrar Producto',
    });
    }
  );
  }

  editarProducto(productoResponse: IProductoResponse):void{console.log('editando persona');}

  eliminarProducto(productoResponse: IProductoResponse):void{console.log('eliminando producto')}

  

}
