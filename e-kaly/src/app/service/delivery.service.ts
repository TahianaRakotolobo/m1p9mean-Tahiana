import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  getAllOrders(iddeliveryman:number){
    var urlresto = base_url + 'ordered-resto-client';
    let input = {
      iddeliveryman : iddeliveryman,
    }
    return this.http.post(urlresto, input);
  }

  getDeliverydetails(idresto:number, idclient:number){
    var urldelivery = base_url + 'order-details-delivery';
    let input = {
      idresto : idresto,
      idclient : idclient
    }
    return this.http.post(urldelivery, input);
  }

  change(idresto:number, idclient:number, state:string){
    var urldelivery = base_url + 'statechange-delivery';
    let input = {
      idresto : idresto,
      idclient : idclient,
      state : state
    }
    return this.http.put(urldelivery, input);
  }
}
