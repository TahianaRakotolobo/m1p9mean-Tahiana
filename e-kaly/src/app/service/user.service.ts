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
    var urlLogin = base_url+'login';
    console.log(urlLogin);
    let input = {
      mail : login,
      mdp : password
    }
    console.log(input);
    return this.http.post(urlLogin, input);
  }

  setUser (data : any) {
    user.token = data['token'];
    user.mail = data['mail'];

    console.log('env', user);
  }
}
