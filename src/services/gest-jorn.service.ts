import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestJornService {

  public apiUrl: string = 'https://alp-cloud.com:8449/api/';

  constructor( private http: HttpClient ) { }

  getJorn(codJorn) { //https://alp-cloud.com:8449/api/AR_dp08r/VerificatorPersonal/000176
    return this.http.get(this.apiUrl + 'AR_dp08r/getworkersCODJOR/' + codJorn)
  }

  getJornData(codJorn) { //https://alp-cloud.com:8449/api/AR_dp08r/VerificatorPersonal/000176
    return this.http.get(this.apiUrl + 'AR_dp08r/VerificatorPersonal/' + codJorn)
  }

  getallLab(cod) {
    return this.http.get(this.apiUrl + 'AR_dp08r/getlab/' + cod);
  }


}
