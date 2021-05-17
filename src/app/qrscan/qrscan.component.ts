
import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { GestJornService } from 'src/services/gest-jorn.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.component.html',
  styleUrls: ['./qrscan.component.css']
})
export class QrscanComponent implements OnInit {


  public arrJornDataUnit: any = [];
  public nombre;
  public cedula;
  public hora;
  public pLabores   = false;
  public pIngresado = false;
  public scannerQR  = false;

  @ViewChild(QrScannerComponent, { static : false }) qrScannerComponent: QrScannerComponent ;

    ngOnInit() {

      this.scannerQR = true;


      this.nombre = localStorage.getItem('Nombre');
      this.cedula = localStorage.getItem('Cedula');
      this.hora = localStorage.getItem('Hora');

    }

    constructor(  public dataJorn: GestJornService ) {

    }
    public camera: string = 'back';
    public codJor: string = '---';
    public devices: any = [];
    public messageCam: string;


    ngAfterViewInit(): void {

      this.cameraControl(this.camera);

    }


    cameraControl(a) {
      this.qrScannerComponent.getMediaDevices().then(devices => {

        //console.log(devices);
        const videoDevices: MediaDeviceInfo[] = [];

        for (const device of devices) {
            if (device.kind.toString() === 'videoinput') {
                videoDevices.push(device);
                // console.log(videoDevices);
                this.devices = videoDevices;
            }
        }

        if (videoDevices.length >= 0) {
          console.log(videoDevices.length)
            let choosenDev;

            //console.log(videoDevices);

            for (const dev of videoDevices) {

                if (dev.label.includes(a)) {
                    choosenDev = dev;
                    this.messageCam = 'Si tiene camara posterior';
                    break;
                }

                else {
                  choosenDev = dev;
                  this.messageCam = 'No tiene camara posterior';
                }

            }

            if (choosenDev) {
                this.qrScannerComponent.chooseCamera.next(choosenDev);
            }

            else {
              this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
            }

        }
    });

    this.qrScannerComponent.capturedQr.subscribe( result => {

        document.getElementsByTagName('video')[0].style.display = 'none';
        this.codJor = result;
        localStorage.setItem('codJor', this.codJor);
        this.getJornData(this.codJor);

      });

    }

    changeCamera(a) {
      this.camera = a;
      this.cameraControl(a);
      console.log(this.camera);
    }

    public arrJorn:any = []
    getJornData(codJorn) {
      this.dataJorn.getJorn(codJorn).subscribe( dJorn => {
        this.arrJorn = dJorn;
        console.log(this.arrJorn);
        this.getJornDataUnit(codJorn);
        if( this.arrJorn[0].httpResponseText == '_POST_' ) {

          Swal.fire({
            title: 'Estás marcando un ingreso',
            position: 'top-start',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Correcto?`,
            denyButtonText: `No entrar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Haz ingresado a laborar!', '', 'success');
              location.reload();
            } else if (result.isDenied) {
              Swal.fire('Se ha cancelado el ingreso', '', 'info');
              location.reload();
            }
          })
      }

      else {
        Swal.fire({
          title: 'Gracias por trabajar el día de hoy!',
          showDenyButton: true,
          position: 'top-start',
          showCancelButton: true,
          confirmButtonText: `Correcto!`,
          denyButtonText: `No salir`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
            location.reload();
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
            location.reload();
          }
        })
      }

      }, err => {

      })
    }

    getJornDataUnit(jorn) {
      this.dataJorn.getJornData(jorn).subscribe( j => {
        this.arrJornDataUnit = j;

        this.nombre = this.arrJornDataUnit.nombre + ' ' + this.arrJornDataUnit.apellido;
        this.cedula = this.arrJornDataUnit.cedula;
        this.hora = new Date();

        localStorage.setItem('Nombre', this.nombre);
        localStorage.setItem('Cedula', this.cedula);
        localStorage.setItem('Hora',   this.hora);

        this.arrJornDataUnit = {

            codjor: this.arrJornDataUnit.codjor,
            nombre: this.arrJornDataUnit.nombre,
            apellido: this.arrJornDataUnit.apellido,
            cond_jor: this.arrJornDataUnit.cond_jor,
            cedula: this.arrJornDataUnit.cedula,
            hora: this.hora

          }

          this.dbFun(this.arrJornDataUnit, 'data_jorn');

      })
    }



    public arrCursor: any = [];
    dbFun(data, bd) {
      var db;
      const request = indexedDB.open(bd, 1);

      //funcion que capta errores
      request.onerror = (error) => console.log(error);

      //funcion capta los requirimientos positivos de mis transacciones
      request.onsuccess = (e) => {

        db = request.result;
        const transaction =  db.transaction([bd], 'readwrite');
        const objectStore = transaction.objectStore(bd);
        let r = objectStore.add(data);
        readData();

      }

        const readData = () => {
        const transaction =  db.transaction([bd], 'readonly');
        const objectStore = transaction.objectStore(bd);
        const request = objectStore.openCursor();

        request.onsuccess = (e) => {

          const cursor = e.target.result;

          if( cursor ) {

            this.arrCursor.push(cursor.value);
            cursor.continue();

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



    reiniciarQR() {
      location.reload();
    }

    show(a, b, c) {
      this.pLabores = a;
      this.pIngresado = b;
      this.scannerQR = c;
    }

}
