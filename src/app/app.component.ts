import { Component,  OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;
declare let alertify: any;
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {IActivitys} from './activitys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  faPlusCircle = faPlusCircle;

  public administrativeExpence: number;
  public coinType = 'RD$';
  public timeType =  'Dias';

// onbjeto para las actividades
  activitys =  {
    name: '',
    prerequisites: [],
    nA: null,
    nM: null,
    nB: null,
    nCost: null,
    rA: null,
    rM: null,
    rB: null,
    rCost: null,
    tN: null,
    tR: null,
    vTN: null,
    vTR: null,
    amount: null
  };

  activityArr = [];

// arreglo para almacenar todos los objetos creados
  pertDb = [];


  constructor( ) {

  }

  ngOnInit() {

   // this.toggleModalRegister();
    this.toggleModalGastAdmin();
  }

  /**
   * configuracion de la ventana modal
   */
  toggleModalRegister() {

    $('#RegisterData').modal({ // <= evitar que se cierre e modal al dar click a los lados
      backdrop: 'static', keyboard: false
    });

    /*$( document ).ready(() => {
      $('#RegisterData').modal('toggle'); // <= el modal se mantendra actio cuando la pagina recargue
    });*/
  }

  toggleModalGastAdmin() {
    $('#gAdmin').modal({ // <= evitar que se cierre e modal al dar click a los lados
      backdrop: 'static', keyboard: false
    });
    $(document).ready(() => {
       $('#gAdmin').modal('toggle'); // <= el modal se mantendra actio cuando la pagina recargue
    });
  }

  fillActivityArr() {
    for (let i = 0; i < this.pertDb.length; i++) {
      this.activityArr[i] = this.pertDb[i].name;
    }
  }
  addPrerreq() {

  }




  add2() { // prueva de alerta y recorrida del array pertBb
    alertify.success('hola');
    this.pertDb.forEach(element => {
      console.log(element);
    });
  }

  add() {

    this.pertDb.push(this.activitys); // prueba de que el array guarda los objertos con exito

    console.log(this.pertDb);

  }
  submit(f) {
    console.log(f.value);
  }

}


  /*this.activitys.push({
        name: this.n1,
        dependecy: ['hola', 'hola2'],
        costo: 1nullnullnull
      });*/

    // console.log(this.activitys[1].costo);
