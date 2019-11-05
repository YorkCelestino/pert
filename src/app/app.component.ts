import { Component } from '@angular/core';
declare var jQuery: any;
declare var $: any;
declare let alertify: any;
import {IActivitys} from './activitys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


// onbjeto para las actividades
  activitys =  {
    name: '',
    prerequisites: [],
    nA: 0,
    nM: 0,
    nB: 0,
    nCost: 0,
    rA: 0,
    rM: 0,
    rB: 0,
    rCost: 0,
    tN: 0,
    tR: 0,
    vTN: 0,
    vTR: 0,
    amount: 0
  };
// arreglo para almacenar todos los objetos creados
  pertDb = [];


  constructor( ) {
  }

  toggleModal() { // <= evitar que se cierre e modal al dar click a los lados
    $('#RegisterData').modal({backdrop: 'static', keyboard: false});
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

}


  /*this.activitys.push({
        name: this.n1,
        dependecy: ['hola', 'hola2'],
        costo: 1000
      });*/

    // console.log(this.activitys[1].costo);
