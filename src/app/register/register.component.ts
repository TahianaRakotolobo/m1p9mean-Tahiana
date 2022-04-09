import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username = '';
  password = '';
  usertype = '';
  address = '';
  phone = '';
  message = '';

  constructor(private router: Router, private userservice:UserService) { }

  ngOnInit(): void {
  }

  signup(){
    console.log('signup function');
    var response = true;
    const success = (response: any = []) => {
      console.log('registered');
      this.message = 'registered';
      const id = response.data.id;
      const token = response.data.token;
      const usertype = response.data.usertype;
      // const input = {
      //   id : id,
      //   token : token,
      //   name : this.username,
      //   usertype : usertype
      // };
      // this.userservice.setUser(input);


      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('name', this.username);
      localStorage.setItem('usertype', usertype);


      this.router.navigateByUrl('/accueil');
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      this.message = 'erreur';
    }
    this.userservice.signup(this.username, this.password, this.usertype, this.address, this.phone).subscribe(success, error);

    // this.userservice.signup(this.username, this.password, this.usertype, this.address);
  }

}
