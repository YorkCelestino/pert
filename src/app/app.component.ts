import { Component,  OnInit, ɵConsole } from '@angular/core';
declare var jQuery: any;
declare var $: any;
declare let alertify: any;
import { faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {IActivitys} from './activitys';
import { FormBuilder, FormGroup } from '@angular/forms';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor( ) {
  }
  seeConclutionPlus  = true;
  seeConclutionMinus = false;
  metodo: string;
  /**
   * iconos
   */
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  public administrativeExpence: number;
  public coinType = 'RD$';
  public timeType =  'Dias';
  prerrequisito: any;
  seeTables = false; // <== oculta las tablas si no hay datos registrados
  btndDisabled  = true;
  criticalRoute = [];
  totalDN: number; // <=== para la Duracioin total
  totalVN: number; // <=== para la Varianza total
  totalCostN: number; // <=== para el costo total
  sumAmauntN: number; // <=== suma imorte normal
  criticalRouteR = []; // <=== Ruta critica Reducida
  totalDR: number; // <=== para la Duracioin total Reducida
  totalVR: number; // <=== para la Varianza total Reducida
  totalCostR: number; // <=== para el costo total Reducida
  registeredPrerequisites = [];
  groupedActivities = [];


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
  pertDb = [];


  ngOnInit() {

   // this.toggleModalRegister();
     this.toggleModalGastAdmin();
     this.setObject();
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
    // tslint:disable-next-line:no-shadowed-variable
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
      this.registeredPrerequisites.push(this.activitys.prerequisites);
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
    this.totalDN = null;
    this.totalVN = null;
    this.duration(); // <== normal
    this.tCostN(); // <== Normal

    this.totalDR = null;
    this.durationR(); // <== Reducido
    this.tCostR();
    // console.log(this.pertDb);


  }

  /**
   * normal
   */
  foundMin(i1) {
     // tslint:disable-next-line:prefer-const
     let arr = [];
     let found;
     for (const iterator of this.registeredPrerequisites[i1]) {
       found = this.pertDb.find(e => e.name === iterator);
       arr.push(found);
     }

   // tslint:disable-next-line:prefer-for-of
     for (let index = 0; index < arr.length; index++) {
       if (arr[index].tN <  arr[index + 1].tN ) {
        // console.log(arr[index].tN);
         return arr[index].tN;
       } else {
         // console.log(arr[index + 1].tN);
         return arr[index + 1].tN;
       }
    }

  }
  /**
   * Reducido
   */
  foundMinR(i1) {
     // tslint:disable-next-line:prefer-const
     let arr = [];
     let found;
     for (const iterator of this.registeredPrerequisites[i1]) {
       found = this.pertDb.find(e => e.name === iterator);
       arr.push(found);
     }

   // tslint:disable-next-line:prefer-for-of
     for (let index = 0; index < arr.length; index++) {
       if (arr[index].tR <  arr[index + 1].tR ) {

         return arr[index].tR;

       } else {

         return arr[index + 1].tR;

       }
    }

  }
  /**
   * Normal
   */
  foundTime(min) {
    // console.log(i1);
    let sumTime = 0;
    let sumVariance = 0;

    this.pertDb.forEach((elementTime) => {
      // tslint:disable-next-line:no-conditional-assignment
      if (elementTime.tN !== min) {
        // console.log(element.tN);
        sumTime = sumTime + elementTime.tN;
        sumVariance = sumVariance + elementTime.vTN;
      }

    });
    return [sumTime, sumVariance];
    // found = this.pertDb.find(e => e.name === this.registeredPrerequisites[i1][0]);
    // console.log(found.tN);
  }

 /**
  * Reducido
  */
  foundTimeR(min) {
    // console.log(i1);
    let sumTime = 0;
    let sumVariance = 0;

    this.pertDb.forEach((elementTime) => {
      // tslint:disable-next-line:no-conditional-assignment
      if (elementTime.tR !== min) {
        sumTime = sumTime + elementTime.tR;
        sumVariance = sumVariance + elementTime.vTR;
      }

    });
    return [sumTime, sumVariance];
  }

  /**
   * Normal
   */
  foundCriticalN(min) {
   const criticalN = [];

   this.pertDb.forEach((elementCritical) => {
      // tslint:disable-next-line:no-conditional-assignment
      if (elementCritical.tN !== min) {
        // console.log(element.tN);
        criticalN.push(elementCritical.name);
      }
    });
   return criticalN;

  }

  /**
   * Reducida
   */
  foundCriticalR(min) {
   const criticalR = [];

   this.pertDb.forEach((elementCritical) => {
      // tslint:disable-next-line:no-conditional-assignment
      if (elementCritical.tR !== min) {
        // console.log(element.tN);
        criticalR.push(elementCritical.name);
      }
    });
   return criticalR;

  }
/**
 * Duracion, Varianza, Ruta critica Normal
 */
  duration() {

    /*for (const i of this.pertDb) {
      for (const i1 of this.pertDb) {
        if (i1.prerequisites.indexOf(i.name) >= 0) {
          console.log( i1.name , 'prerrq :', i.name);
        }

       // console.log( i1.name , 'prerrq :', i.name , ' ', i1.prerequisites.indexOf(i.name));
      }
    }*/
    // console.log(this.registeredPrerequisites[2][0]);
    let i1 = 0;
    let min = 0;
    // let sumDuration = 0;
    // let v = 0;
    for (const i of this.registeredPrerequisites) {

      // tslint:disable-next-line:prefer-const
      if (this.registeredPrerequisites[i1].length > 1) {
        // console.log( this.foundBigger(i1));
        min = this.foundMin(i1);
      } else {
        // console.log(this.foundTime(i1));
        // this.foundTime(bigger);
      }
      i1 += 1;
    }
    // tslint:disable-next-line:prefer-const
    let totalDArr = this.foundTime(min);
    this.totalDN = totalDArr[0];
    this.totalVN = totalDArr[1];
    this.criticalRoute = this.foundCriticalN(min);
  }

  /**
   * Duracion, Varianza, Ruta critica reducida
   */
  durationR() {

    let i1 = 0;
    let min = 0;
    for (const i of this.registeredPrerequisites) {

      // tslint:disable-next-line:prefer-const
      if (this.registeredPrerequisites[i1].length > 1) {
        min = this.foundMinR(i1);
      }
      i1 += 1;
    }
    // tslint:disable-next-line:prefer-const
    let totalDArr = this.foundTimeR(min);
    this.totalDR = totalDArr[0];
    this.totalVR = totalDArr[1];
    this.criticalRouteR = this.foundCriticalR(min);
  }
/**
 * Costo total Normal
 */
  tCostN() {
    let sumTCostN = 0;
    this.pertDb.forEach((elementTCostN) => {
      sumTCostN = sumTCostN + elementTCostN.amountN;
      this.sumAmauntN = sumTCostN + elementTCostN.amountN;
    });
    this.totalCostN = sumTCostN + (this.administrativeExpence * this.totalDN);
    sumTCostN = 0;
    // console.log(this.totalCostN);

  }
/**
 * Costo total Reducido
 */
  tCostR() {
    let sumTAmountR = 0;
    this.pertDb.forEach((elementTCostR) => {
      sumTAmountR = sumTAmountR + elementTCostR.amountR;
    });
    this.totalCostR = this.sumAmauntN + (this.administrativeExpence * this.totalDR) + sumTAmountR ;
    sumTAmountR = 0;
    // console.log(this.totalCostN);

  }
  /**
   * Concluciones
   */
  conclution() {
    if (this.seeConclutionPlus) {
      this.seeConclutionMinus = true;
      this.seeConclutionPlus = false;
    } else if (this.seeConclutionMinus) {
      this.seeConclutionPlus = true;
      this.seeConclutionMinus = false;
    }
    if (this.totalCostN === 0 && this.totalCostR === 0) {
      return;
    } else if (this.totalCostN > 0 && this.totalCostR > 0) {
       if (this.totalCostN > this.totalCostR) {
         this.metodo = 'Reducido';
      } else if (this.totalCostR > this.totalCostN) {
        this.metodo = 'Normal';
       }
    }
  }
}
