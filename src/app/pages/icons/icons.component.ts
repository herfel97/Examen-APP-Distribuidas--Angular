import { Component, OnInit } from "@angular/core";
import { ServWSService } from 'src/app/servicios/serv-ws.service';
import { FormBuilder, Validators } from '@angular/forms';
import { restauranteI } from '../../model/restaurant.interface';
import { ResponseI } from "src/app/model/response.interface";


@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})


export class IconsComponent implements OnInit {

  telefono:string;

  formulario = this.formBuilder.group({
    nombre: [ '' ,Validators.required ],
    direccion:[ '' ,Validators.required] ,
    telefono:['', Validators.compose([
        Validators.required,
        Validators.minLength(9)
    ])],
    aforo:['',Validators.required ]
  });

  constructor(private service: ServWSService, private formBuilder: FormBuilder ){} 
    
  public restaurantes:any = [];


  ngOnInit() {
    this.service.getRestaurantes().subscribe
    ((response:any) =>{
      this.restaurantes = response
    }, (error: any) => {
      console.log(error)
    });
  }

  submitForm(form:restauranteI){
    this.service.registrarRestaurant(form).subscribe(data => {
      console.log(data); 
      alert(data.respuesta);
      window.location.reload();
  })
  
  
  }
  

}
