import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

 info:any = {};
 cargada:boolean = false;
 cargadaPaginas:boolean = false;
 paginas:any[] = [];


  constructor( public http:Http ) {
    this.carga_info();
    this.cargaPaginas();
  }

  public carga_info(){
    this.http.get("assets/data/info.pagina.json")
             .subscribe( data =>{
               this.cargada = true;
               this.info = data.json();
             } )
  }

  public cargaPaginas(){
     this.http.get("https://portafoliopersonal-f3203.firebaseio.com/paginas.json")
              .subscribe( data =>{
                console.log(data.json());
                this.cargadaPaginas = true;
                this.paginas = data.json();
              } )
   }
}
