import { Component, OnInit } from "@angular/core";
import { ServWSService } from 'src/app/servicios/serv-ws.service';
import { FormBuilder, Validators } from '@angular/forms';
import { clienteI } from "src/app/model/cliente.interface";
import { restauranteI } from "src/app/model/restaurant.interface";
import { ThrowStmt } from "@angular/compiler";



@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent implements OnInit {
  cliente:clienteI;
  restaurantI:restauranteI;

  formulario = this.formBuilder.group({
    cedula: ['', Validators.compose([
      Validators.required,
      Validators.minLength(10)
    ])]
  });

  formulario2 = this.formBuilder.group({
    nombreRes: ''
  });

  formulario3 = this.formBuilder.group({
    asistentes: ['', Validators.required],
    fecha:['',Validators.required ],
    hora:['',Validators.required ]
  });

  cedulaBusq:string = null ;

  nombreCliente= '';
  correoCliente='';
  telefonoCliente='';

  busquedaExitosa = false;
  clienteBusq = true;
  restBusq = true;
  restfalse = false;
  restExitoso = false;


  nombreRestaurante ;
  restaurant = true;

  nombreRes;
  direccionRes;
  aforoRes;



  constructor(private service:ServWSService, private formBuilder: FormBuilder) {}
  ngOnInit() { }

  submitForm(){
    this.service.buscarCliente(this.formulario.value.cedula).subscribe(
      data => this.cliente = data);
      this.nombreCliente = this.cliente.nombre;
      this.correoCliente = this.cliente.correo;
      this.telefonoCliente = this.cliente.telefono;
      this.busquedaExitosa=true;
      this.clienteBusq = false;
  }

  submitForm2(){
    this.service.buscarRestaurante(this.formulario2.value.nombreRes).subscribe(
      data => this.restaurantI = data);
    if(this.restaurantI == null){
      this.restfalse=true;
    }else{
    this.nombreRes = this.restaurantI.nombre;
    this.direccionRes = this.restaurantI.direccion;
    this.restExitoso=true;
    }


  }
  validarAforo(asist){
    if(asist <= this.restaurantI.aforo){
      return true;
    }else{
      return false;
    }
  }

  saludar(){
    if(this.validarAforo(this.formulario3.value.asistentes)){
      console.log("registrando reserva")
      this.service.registrarReserva(
        this.formulario.value.cedula,
        this.nombreRes, 
        this.formulario3.value.asistentes,
        this.formulario3.value.fecha,
        this.formulario3.value.hora).subscribe(data => {
          console.log(data);
      });
      alert("!! Registro exitoso: Reserva de "+this.nombreCliente + " en el restaurant "+this.nombreRes + "creada con exito !!");
      window.location.reload();
    }else{
      console.log("Asistentes exceden aforo")
      alert("Revise asistentes, exceden aforo del restaurant a esa hora");

    }
    
  }
}
