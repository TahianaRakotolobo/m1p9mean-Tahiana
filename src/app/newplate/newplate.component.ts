import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../service/restaurant.service';
import { user } from 'src/environments/environment';

@Component({
  selector: 'app-newplate',
  templateUrl: './newplate.component.html',
  styleUrls: ['./newplate.component.css']
})
export class NewplateComponent implements OnInit {

  message = '';
  name = '';
  price = '';
  benefits = '';

  constructor(private router: Router, private restoservice:RestaurantService) { }

  ngOnInit(): void {
    // console.log("id", user.id);
  }

  submit(){
    const success = (response: any = []) => {
      // console.log("Success", response);
      // console.log("Token", response.data.token);
      this.router.navigateByUrl('/plate');
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      this.message = 'erreur';
    }
    this.restoservice.save(this.name, this.price, this.benefits).subscribe(success, error);
  }
}
