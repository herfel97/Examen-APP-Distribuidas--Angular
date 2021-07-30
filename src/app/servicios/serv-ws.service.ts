import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from '../model/response.interface';
import { restauranteI } from '../model/restaurant.interface';
import { clienteI } from "../model/cliente.interface";
import { reservaI } from '../model/reservaI.interface';

@Injectable({
  providedIn: 'root'
})
export class ServWSService {
  postId:any;
  errorMessage:any;

  constructor(private http:HttpClient) { }

getRestaurantes (){
  return this.http.get('http://localhost:8080/MorochoArevalo-Hernan-Examen/rest/restaurant/list')
}

registrarRestaurant(form:restauranteI): Observable<any>{
  const body = new HttpParams()
  .set('nombre', form.nombre.toUpperCase())
  .set('direccion', form.direccion.toUpperCase())
  .set('telefono', form.telefono.toUpperCase()) 
  .set('aforo', form.aforo); 

  let url = 'http://localhost:8080/MorochoArevalo-Hernan-Examen/rest/restaurant/registrar';
  return this.http.post<ResponseI>(url, body.toString(),  {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  }
);
}

getClientes(){
  return this.http.get('http://localhost:8080/MorochoArevalo-Hernan-Examen/rest/clientes/list')
}

registrarCliente(form:clienteI): Observable<any>{
  const body = new HttpParams()
  .set('nombre', form.nombre.toUpperCase())
  .set('cedula', form.cedula)
  .set('correo', form.correo) 
  .set('telefono', form.telefono); 

  let url = 'http://localhost:8080/MorochoArevalo-Hernan-Examen/rest/clientes/registrar';
  return this.http.post<ResponseI>(url, body.toString(),  {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  }
);
}

buscarCliente(cedula):Observable<any>{
return this.http.get<clienteI>('http://localhost:8080/MorochoArevalo-Hernan-Examen/rest/clientes/buscar/'+cedula);
}

buscarRestaurante(nombre):Observable<any> {
return this.http.get<restauranteI>('http://localhost:8080/MorochoArevalo-Hernan-Examen/rest/restaurant/buscar/'+nombre);
}

  listarReservasPorCedula(cedula):Observable<any>{
    return this.http.get<reservaI>('http://localhost:8080/MorochoArevalo-Hernan-Examen/rest/reserva/list/'+cedula);
  }

  listarReservasPorRestaurant(nombre):Observable<any>{
    return this.http.get<reservaI>('http://localhost:8080/MorochoArevalo-Hernan-Examen/rest/reserva/listar/'+nombre);
  }

  registrarReserva(cedula,restaurant,asistentes,fecha,hora):Observable<any>{
    const body = new HttpParams()
    .set('cedulaCliente', cedula)
    .set('nombreRestaurant', restaurant)
    .set('asistentes', asistentes) 
    .set('fecha', fecha)
    .set('hora', hora);

    let url = 'http://localhost:8080/MorochoArevalo-Hernan-Examen/rest/reserva/registrar';
    return this.http.post<ResponseI>(url, body.toString(),  {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });

  }


}
