import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  n1 = 0;
  n2 = 0;
  suma1 = 0;
  suma() {
    this.suma1 = this.n1 + this.n2;
  }

}
