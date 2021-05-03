import { Component, OnInit } from '@angular/core';
import Instacam from 'instacam';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.styl']
})
export class InitComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.camaQR();
  }

  camaQR() {
        
    let camera = new Instacam(
      document.querySelector('#canvas1'), {
        width: 800,
        height: 600
      }
    );
  
  }

}
