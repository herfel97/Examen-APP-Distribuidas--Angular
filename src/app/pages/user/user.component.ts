import { Component, OnInit } from "@angular/core";
import { ServWSService } from 'src/app/servicios/serv-ws.service';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {

  busquedaClie=false;
  noexiste=false;

  formulario = this.formBuilder.group({
    'cedula': ['',Validators.compose([
      Validators.minLength(10)])]
  });

  reservas1:any [];
  reservas2:any [];

  formulario2 = this.formBuilder.group({
    nombre: ''
  });

  constructor(private service:ServWSService, private formBuilder: FormBuilder) {}
  ngOnInit() {}

  submitForm(){
    this.service.listarReservasPorCedula(this.formulario.value.cedula).subscribe(
      data => this.reservas1 = data);
      if(this.reservas1.length>0){
        this.busquedaClie=true;
        this.noexiste=false;
      }else{
        this.formulario.reset();
        this.noexiste=true;
      }
      
  }

  buscar(){
    this.service.listarReservasPorRestaurant(this.formulario2.value.nombre).subscribe(
      data => this.reservas2 = data);
  }


}
