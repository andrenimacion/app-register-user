import { Component, OnInit } from '@angular/core';
import { GestJornService } from 'src/services/gest-jorn.service';

@Component({
  selector: 'app-labores',
  templateUrl: './labores.component.html',
  styleUrls: ['./labores.component.css']
})
export class LaboresComponent implements OnInit {

  constructor(public dataJorn: GestJornService) { }

  ngOnInit() {
    this.getLab(0);

  }

  public arrLab: any = [];
    getLab(cod) {
      this.dataJorn.getallLab(cod).subscribe( lab => {
        this.arrLab = lab;
        console.log(this.arrLab);
      })
    }


}
