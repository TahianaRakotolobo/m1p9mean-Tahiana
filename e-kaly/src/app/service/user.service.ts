import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { base_url } from 'src/environments/environment';
import {user} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  authenticate(login:string, password:string){
    var urlLogin = base_url+'signin';
    console.log(urlLogin);
    let input = {
      username : login,
      password : password
    }
    console.log(input);
    return this.http.post(urlLogin, input);
  }

  setUser (data : any) {
    user.token = data['token'];
    user.id = data['id'];
    user.name = data['name'];
    user.usertype = data['usertype'];
    // console.log('env', user);
  }

  signup(username:string, password:string, usertype:string, address:string, phone:string){
    // console.log(username + ' ' + password + ' ' + usertype + ' ' + address);
    var urlregister = base_url+'signup';
    console.log(urlregister);
    let input = {
      username : username,
      password : password,
      usertype : usertype,
      address : address,
      phone : phone
    }
    console.log(input);
    return this.http.post(urlregister, input);
  }

  getResto(){
    var urlresto = base_url + 'listeresto';
    return this.http.get(urlresto);
  }

  getPlate(idresto:number){
    var urlresto = base_url + 'menu';
    let input = {
      idresto : idresto,
    }
    return this.http.post(urlresto, input);
  }

  research(word:string){
    var urlsearch = base_url + 'menu';
    let input = {
      word : word,
    }
    return this.http.post(urlsearch, input);
  }
}
