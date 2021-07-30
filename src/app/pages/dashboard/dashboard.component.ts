import { Component, OnInit } from "@angular/core";
import { ServWSService } from 'src/app/servicios/serv-ws.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { clienteI } from "../../model/cliente.interface";
import { visitLexicalEnvironment } from "typescript";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

  formulario = this.formBuilder.group({
    nombre:['',Validators.required ],
    cedula:[null, Validators.compose([
        Validators.required,
        Validators.minLength(10),
    ])],

    correo:['',Validators.compose([
      Validators.required,
      Validators.pattern(this.emailPattern)])],
      
    telefono:[null, Validators.compose([
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(10)])]
  });
  
  constructor(private service:ServWSService, private formBuilder: FormBuilder) {}

  public clientes:any = [];

  ngOnInit() { 
    this.service.getClientes().subscribe
    ((response:any) =>{
      this.clientes = response
    }, (error: any) => {
      console.log(error)
    });

  }

  submitForm(form:clienteI){
      this.service.registrarCliente(form).subscribe(data => {
        console.log(data); 
        alert(data.respuesta);
        window.location.reload();
    })  
  }


}
