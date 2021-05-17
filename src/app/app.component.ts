import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  title = 'angular-qrscanner';

}


