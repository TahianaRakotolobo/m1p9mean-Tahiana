import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { base_url } from 'src/environments/environment';
import { user } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  save(name:string, price:string, benefits:string){
    var urlsave = base_url+'newplate';
    console.log(urlsave);
    var idresto = Number(localStorage.getItem('id'));
    let input = {
      name : name,
      price : price,
      benefits : benefits,
      idresto : idresto
    }
    console.log(input);
    return this.http.post(urlsave, input);
  }

  getAllPlate(idresto:number){
    var urlresto = base_url + 'plates';
    let input = {
      idresto : idresto,
    }
    return this.http.post(urlresto, input);
  }
}
