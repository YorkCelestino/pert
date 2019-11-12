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
  }

  toggleModalGastAdmin() {
    $('#gAdmin').modal({ // <= evitar que se cierre e modal al dar click a los lados
      backdrop: 'static', keyboard: false
    });
    $(document).ready(() => {
       $('#gAdmin').modal('toggle'); // <= el modal se mantendra actio cuando la pagina recargue
    });
  }


  fillActivityArr() { // => funcion pra llenar el arreglo de prerequisitos

    for (let i = 0; i < this.pertDb.length; i++) {
      this.activityArr[i] = this.pertDb[i].name;
    }
  }


  addPrerreq() { // => añadiendo prerequisitos al pulsar el boton con el signo de +

      // tslint:disable-next-line:prefer-const
      let positionActivity  = this.activityArr.indexOf(this.prerrequisito);
      if ( positionActivity === -1) {

        alertify.error('Tiene que seleccionar una actividad');

      } else {
        this.activitys.prerequisites.push(this.prerrequisito);
        if (this.activitys.prerequisites.length > 0) {
          alertify.success('Prerrequisito "' + this.prerrequisito + '" agregado');
        }
        this.activityArr.splice(positionActivity, 1);

      }

  }

  addPertDb() {
    this.pertDb.push(this.activitys); // Añadiendo objetos al array que sirve como base de datos
  }

  calData() {
    /**
     * funcion para calcular Te(N), Te(R), VTe(N), VTe(R), importe
     */
    // Te(N)
    this.activitys.tN = (this.activitys.nA + (4 * this.activitys.nM) + this.activitys.nB) / 6 ;

    // Te(R)
    this.activitys.tR = (this.activitys.rA + (4 * this.activitys.rM) + this.activitys.rB) / 6 ;


    // VTe(N)
    this.activitys.vTN = 0;

    // VTe(R)
    this.activitys.vTR = 0;

    // importe
    this.activitys.amount = 0;
  }

  // valida si la actividad que se registra existe en pertDB
  authActivity() {
    let valid = true;
    this.pertDb.forEach(element => {

      if (element.name === this.activitys.name ) {
        alertify.error('la Actividad ' + this.activitys.name + ' ya existe');
        this.activitys.name = '';
        valid = false;
        return;
      }

  });
    return valid; // si la actividad existe retorna falso
  }

  register() {

    // tslint:disable-next-line:prefer-const
    let valid = this.authActivity(); // si el valor es falso no se registra la actividad
    if (valid) {
      this.addPertDb();
      this.fillActivityArr();
      if (this.activitys.prerequisites.length === 0 ) {
        this.activitys.prerequisites[0] = '-';
      }

      this.calData();

      alertify.success('Actividad ' + this.activitys.name + 'registrada con exito');

      this.setObject();

      $('#RegisterData').modal('hide');

      return;

    } else {

      alertify.warning('No se puede registrar esta actividad');

    }

    console.log(this.pertDb);


  }


}


