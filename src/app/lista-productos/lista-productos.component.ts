import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {

  constructor( private activeRouter:ActivatedRoute, private router:Router ) { }

  ngOnInit(): void {
    let pedidoid = this.activeRouter.snapshot.paramMap.get('id');
    console.log(pedidoid);
  }

  redirigir(){
    console.log("redirigiend");
    this.router.navigate(['dash']) ;
  }

}
