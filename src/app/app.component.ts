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
  seeTables = true; // <==== Cambiar valor a false luego
  btndDisabled  = true;
  calcularDuracionNormal: any = 0;
  calD = [];

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
    amountN: null,
    amountR: null
  };


  activityArr = [];

// arreglo para almacenar todos los objetos creados
  pertDb = [
    {
      name: 'A',
      prerequisites: ['-'],
      nA: 1,
      nM: 2,
      nB: 3,
      nCost: 100000,
      rA: 0.5,
      rM: 1,
      rB: 2,
      rCost: 25000,
      tN: 2,
      tR: 1.08,
      vTN: 0.10,
      vTR: 0.06,
      amountN: 200000,
      amountR: 235000
    },
    {
      name: 'B',
      prerequisites: ['A'],
      nA: 4,
      nM: 5,
      nB: 6,
      nCost: 1000000,
      rA: 3,
      rM: 4,
      rB: 5,
      rCost: 90000,
      tN: 5,
      tR: 4,
      vTN: 0.10,
      vTR: 0.10,
      amountN: 5000000,
      amountR: 90000
    },
    {
      name: 'C',
      prerequisites: ['A'],
      nA: 2,
      nM: 3,
      nB: 4,
      nCost: 500000,
      rA: 1,
      rM: 2,
      rB: 3,
      rCost: 10000,
      tN: 3,
      tR: 2,
      vTN: 0.10,
      vTR: 0.10,
      amountN: 1500000,
      amountR: 10000
    },
    {
      name: 'D',
      prerequisites: ['B', 'C'],
      nA: 5,
      nM: 6,
      nB: 7,
      nCost: 900000,
      rA: 4,
      rM: 5,
      rB: 6,
      rCost: 81000,
      tN: 6,
      tR: 5,
      vTN: 0.10,
      vTR: 0.10,
      amountN: 5400000,
      amountR: 81000
    },
    {
      name: 'E',
      prerequisites: ['D'],
      nA: 3,
      nM: 4,
      nB: 5,
      nCost: 700000,
      rA: 2,
      rM: 3,
      rB: 4,
      rCost: 85000,
      tN: 4,
      tR: 3,
      vTN: 0.10,
      vTR: 0.10,
      amountN: 2800000,
      amountR: 85000
    }
  ];


  ngOnInit() {

   // this.toggleModalRegister();
    // this.toggleModalGastAdmin();
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
      amountN: null,
      amountR: null
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
    this.activitys.vTN =  Math.pow(((this.activitys.nB - this.activitys.nA) / 6), 2);

    // VTe(R)
    this.activitys.vTR = Math.pow(((this.activitys.rB - this.activitys.rA) / 6), 2);

    // importe Normal
    this.activitys.amountN = this.activitys.tN * this.activitys.nCost;

    // importe Reducido
    this.activitys.amountR = this.activitys.tR * this.activitys.rCost;
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

  /**
   * registro de los datos por actividad
   */
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

      // return;
      // this.calcularDuracionNormal = 0;

    } else {

      alertify.warning('No se puede registrar esta actividad');

    }

    if (this.pertDb.length > 0) {
      this.seeTables = true;
      this.btndDisabled = false;
    }

    console.log(this.pertDb);
    // console.log(this.Duration());

  }

  duration() {
    for (const i of this.pertDb) {
      for (const i1 of this.pertDb) {
        if (i1.prerequisites.indexOf(i.name) >= 0) {
          console.log( i1.name , 'prerrq :', i.name);
        }
       // console.log( i1.name , 'prerrq :', i.name , ' ', i1.prerequisites.indexOf(i.name));
      }
    }
  }
}
