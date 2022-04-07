import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId = '';
  password = '';
  message = '';

  constructor(private router: Router, private service:UserService) { }

  ngOnInit(): void {
  }

  signin() : void {
    var response = true;
    const success = (response: any = []) => {
      console.log("Success", response);
      console.log("Token", response.data.token);
      const id = response.data.id;
      const token = response.data.token;
      const usertype = response.data.usertype;
      // const input = {
      //   id : id,
      //   token : token,
      //   name : this.userId,
      //   usertype : usertype
      // };
      // this.service.setUser(input);

      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('name', this.userId);
      localStorage.setItem('usertype', usertype);

      this.router.navigateByUrl('/accueil');
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      this.message = 'erreur';
    }
    this.service.authenticate(this.userId, this.password).subscribe(success, error);
  }
}
