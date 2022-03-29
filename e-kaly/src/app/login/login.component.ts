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
      const token = response;
      const input = {
        mail : this.userId,
        token : token
      };
      // this.service.setUser(input);
      this.router.navigateByUrl('/accueil');
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      this.message = 'erreur';
    }
    this.service.authenticate(this.userId, this.password).subscribe(success, error);
  }
}
