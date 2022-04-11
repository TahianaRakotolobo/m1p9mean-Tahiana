import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllOrders(){
    var url = base_url + 'readyorders';
    return this.http.get(url);
  }

  getDeliverymen(){
    var url = base_url + 'deliverymen';
    return this.http.get(url);
  }

  getNbDelivery(id:number){
    var url = base_url + 'nborders';
    let input = {
      iddeliveryman : id
    }
    return this.http.post(url, input);
  }

  savedelivery(idclient:number, idresto:number, idman:number){
    var url = base_url + 'deliver';
    let input = {
      idclient : idclient,
      idresto : idresto,
      iddeliveryman : idman
    }
    return this.http.post(url, input);
  }

  filtrer(filtre:string){
    var urlbenef = base_url + 'benefits-admin';
    let input = {
      filtre : filtre
    }
    return this.http.post(urlbenef, input);
  }
}
