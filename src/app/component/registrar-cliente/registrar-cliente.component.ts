
import { ClienteService } from './../../service/cliente.service';
import { IClienteResponse } from '../../model/cliente-response';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IClienteRequest } from '../../model/cliente-request';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule,ReactiveFormsModule],
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.css'
})
export class RegistrarClienteComponent {
  title = 'Registrar Cliente';
 clienteArray: IClienteResponse[]=[];
 page:number=1;
 clienteForm:FormGroup;
clienteRequest:IClienteRequest = {} as IClienteRequest;


  constructor(private clienteService:ClienteService){
   this.clienteForm=new FormGroup({
     idCliente:new FormControl(''),
     idPersona:new FormControl(''),
     apellidoPaterno: new FormControl('',[
      Validators.required,
      Validators.minLength(2),
     ]),
     apellidoMaterno: new FormControl('',[
      Validators.required,
      Validators.minLength(2),
     ]),
     nombre: new FormControl('',[
      Validators.required,
      Validators.minLength(2),
     ]),
     email: new FormControl('',[
      Validators.required,
      Validators.minLength(2),
     ]),
     telefono: new FormControl('',[
      Validators.required,
      Validators.minLength(2),
     ]),
     direccion: new FormControl('',[
      Validators.required,
      Validators.minLength(2),
     ]),
    });
    }
  
  ngOnInit():void{
    this.clienteForm.reset();
    this.getClientes();
  }
    getClientes():void{
    this.clienteService.getClientes().subscribe((result: any) =>{
      console.log('Result,result');
      this.clienteArray = result;
      console.log(this.clienteArray);

    });
  }   
  setCliente():void{
    this.clienteRequest.idCliente=this.clienteForm.get('id_cliente')?.value;
    this.clienteRequest.idPersona=this.clienteForm.get('id_persona')?.value;
    this.clienteRequest.apellidoPaterno=this.clienteForm.get('apellidoPaterno')?.value;
    this.clienteRequest.apellidoMaterno=this.clienteForm.get('apellidoMaterno')?.value;
    this.clienteRequest.nombre=this.clienteForm.get('nombre')?.value;
    this.clienteRequest.email=this.clienteForm.get('email')?.value;
    this.clienteRequest.direccion=this.clienteForm.get('direccion')?.value;
    this.clienteRequest.telefono=this.clienteForm.get('telefono')?.value;
  }
  
registrarCliente():void {
  console.log('registrando cliente');
  this.setCliente();
  this.clienteService.registrarCliente(this.clienteRequest).subscribe((result: any) =>{
    console.log('registrarCliente',result);
    this.ngOnInit();

    Swal.close();
    Swal.fire({
      icon:'success',
      title: 'registrarPersona....',
      text:'!Se registro el cliente!',
    });
  },
     (err:any) => {
      Swal.close();
    Swal.fire({
      icon:'error',
      title: 'registrarPersona....',
      text:'!Se registro el cliente!',
    });
  }
  );
}




  editarCliente(clienteResponse: IClienteResponse):void{
    console.log('editando persona');
  }


  eliminarCliente(clienteResponse: IClienteResponse):void{
    Swal.fire({
      
      title: 'Esta seguro de eliminar la persona seleccionada',
      showCancelButton:true,
      cancelButtonText:'NO',
      confirmButtonText:'SI',
      focusCancel:true,
    }).then((result)=>{
     if(result.isConfirmed){
     this.clienteRequest.idCliente=clienteResponse.idCliente;
    this.clienteService.eliminarCliente(this.clienteRequest).subscribe(
      (result: any) =>{
      console.log('eliminarCliente',result);
      this.ngOnInit();
  
      Swal.close();
      Swal.fire({
        icon:'success',
        title: 'eliminarCliente....',
        text:'!Se elimino exitosamente el cliente!',
      });
    },
       (err:any) => {
        Swal.close();
      Swal.fire({
        icon:'error',
        title: 'adventencia....',
        text:'!ah ocurrido un error al eliminar el cliente!',
      });
    }
    );
  }
    })
  }
}


    



