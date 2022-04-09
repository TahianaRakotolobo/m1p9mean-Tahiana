import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { base_url } from 'src/environments/environment';
import { Order } from 'src/app/class/order';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  save(order: any){
    // console.log(username + ' ' + password + ' ' + usertype + ' ' + address);
    var urlorder = base_url+'order';

    let input = {
      orders : order
    }
    console.log(urlorder);
    // console.log('orders', input.orders);
    
    return this.http.post(urlorder, input);
  }

  getOrders(id:number){
    var urlordered = base_url+'ordered';
    let input = {
      idclient : id
    }
    console.log(urlordered);
    return this.http.post(urlordered, input);
  }
}
