import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  constructor() { }
  public observable;
  public arrCursor: any = [];



  ngOnInit() {
    this.dbFun('data_jorn');
  }

  dbFun(bd) {
    var db;
    const request = indexedDB.open(bd, 1);

    //funcion que capta errores
    request.onerror = (error) => console.log(error);

    //funcion capta los requirimientos positivos de mis transacciones
    request.onsuccess = (e) => {

      db = request.result;
      const transaction =  db.transaction([bd], 'readwrite');
      const objectStore = transaction.objectStore(bd);
      // let r = objectStore.add(data);
      // readData();
      objectStore.openCursor().onsuccess = (e) => {
        // console.log('Este es mi request: ')
        // console.log(e.target);
        const cursor = e.target.result;
        if( cursor ) {
          this.arrCursor.push(cursor.value);
          cursor.continue();
          console.log(this.arrCursor);



        }
        else {
          console.log('No hay mas Datos');
        }
      }

    }

    //funcion que verifica si hay una nueva actualizacion
    request.onupgradeneeded = () =>{
      db = request.result;
      const objectStore = db.createObjectStore(bd, {
        //autoIncrement: true,
        keyPath: 'codjor'
      });
    }
  }


}
