import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IClienteResponse} from './../model/cliente-response';
import { Observable } from 'rxjs';
import {BASE_URL} from '../utils/constants';
import { IClienteRequest } from '../model/cliente-request';
@Injectable({

  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {}
 
  getClientes(): Observable<IClienteResponse[]> {
   return this.http.get<IClienteResponse[]> ('${BASE_URL}/cliente');

}
 registrarCliente(cliente:IClienteRequest):Observable<IClienteResponse>{
  console.log(cliente);
  return this.http.post<IClienteResponse>('${BASE_URL}/cliente',cliente);
 }  

 eliminarCliente(cliente:IClienteRequest):Observable<IClienteResponse>{
  console.log(cliente);
  return this.http.post<IClienteResponse>('${BASE_URL}/cliente',{
   body:cliente,
 });
}  
}