import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-clientorders',
  templateUrl: './clientorders.component.html',
  styleUrls: ['./clientorders.component.css']
})
export class ClientordersComponent implements OnInit {

  list = new Array();

  constructor(private router: Router, private restoservice:RestaurantService) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(){
    const success = (response: any = []) => {
      console.log("response", response);
      this.list = response.data;
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      // this.message = 'erreur';
    }
    this.restoservice.getAllOrders(Number(localStorage.getItem('id'))).subscribe(success, error);
  }

}
