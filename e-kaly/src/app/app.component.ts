import { Component } from '@angular/core';
import {user} from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = user;
  id = Number(localStorage.getItem('id'));
  token = localStorage.getItem('token');
  name = localStorage.getItem('name');
  usertype = localStorage.getItem('usertype');
  title = 'e-kaly';
  search = '';

  constructor(private router: Router) { }

  signout(){
    localStorage.setItem('id', '-1');
    localStorage.setItem('token', '');
    localStorage.setItem('name', '');
    localStorage.setItem('usertype', '');
    location.reload();
    this.router.navigateByUrl('/accueil');
  }
  research(){
    console.log(this.search);
    this.router.navigate(['/research', { search: this.search }]);
  }
}
