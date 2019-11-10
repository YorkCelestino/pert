import { Component,  OnInit, ɵConsole } from '@angular/core';
declare var jQuery: any;
declare var $: any;
declare let alertify: any;
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {IActivitys} from './activitys';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {


  constructor( ) {
  }
  faPlusCircle = faPlusCircle; // <= icono boton agregar prerrequisito al objeto

  public administrativeExpence: number;
  public coinType = 'RD$';
  public timeType =  'Dias';
  prerrequisito: any;

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


  ngOnInit() {

   // this.toggleModalRegister();
    this.toggleModalGastAdmin();
   // this.setObject();
  }

  setObject() { // => funcion resetear el objeto y limpiar el formulario
    this.activitys =  {
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

  /*clearForm() {
    $('#RegisterForm').trigger('reset');
  }*/


  fillActivityArr() { // => funcion pra llenar el arreglo de prerequisitos

    for (let i = 0; i < this.pertDb.length; i++) {
      this.activityArr[i] = this.pertDb[i].name;
    }
    // console.log(this.activityArr);

  }

  addPrerreq() { // => añadiendo prerequisitos al pulsar el boton con el signo de +
      this.activitys.prerequisites.push(this.prerrequisito);
      if (this.activitys.prerequisites.length > 0) {
        alertify.success('Prerrequisito "' + this.prerrequisito + '" agregago');
      }
      // console.log(this.activitys);

  }


  addPertDb() {
    this.pertDb.push(this.activitys); // Añadiendo objetos al array que sirve como base de datos
    // console.log(this.pertDb);

  }

  calData() {
    /**
     * funcion para calcular Te(N),Te(R), VTe(N),VTe(R),importe
     */
  }

  register(f) {
    // this.activitys.name = f.value.name;
    this.addPertDb();
    this.fillActivityArr();
    if (this.activitys.prerequisites.length === 0 ) {
      this.activitys.prerequisites[0] = '-';
    }
    this.setObject();
    $('#RegisterData').modal('hide');

    console.log(this.pertDb);


  }


}


