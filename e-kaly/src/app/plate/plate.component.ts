import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ClientService } from '../service/client.service';
import { RestaurantService } from '../service/restaurant.service';
import { ActivatedRoute } from "@angular/router";
import { user } from 'src/environments/environment';
import { Order } from 'src/app/class/order';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.css']
})
export class PlateComponent implements OnInit {

  idresto = -1; 
  list = new Array();
  nb = new Array();
  order = new Array();

  constructor(private router: Router, private route: ActivatedRoute, private userservice:UserService, private clientservice:ClientService, private restoservice:RestaurantService) { }

  ngOnInit(): void {
    var usertype = localStorage.getItem('usertype');

    if(usertype != "Restaurant"){
      this.route.queryParams.forEach(param =>
        this.idresto = param['idresto']
      );
      this.getPlate();
    }else{
      this.idresto = Number(localStorage.getItem('id'));
      this.getAllPlate();
    }
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  getPlate(){
    const success = (response: any = []) => {
      console.log("response", response);
      this.list = response.data;
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      // this.message = 'erreur';
    }
    this.userservice.getPlate(this.idresto).subscribe(success, error);
  }

  getAllPlate(){
    const success = (response: any = []) => {
      console.log("response", response);
      this.list = response.data;
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      // this.message = 'erreur';
    }
    this.restoservice.getAllPlate(this.idresto).subscribe(success, error);
  }

  valider(){
    console.log(this.nb);
    let iorder = 0;
    for(let i=0; i<this.list.length; i++){
      // console.log(this.nb[i]);
      if(this.nb[i]>0){
        var oneplate = new Order(this.list[i].id, this.nb[i],Number(localStorage.getItem('id')), this.idresto, new Date(), 'commande');
        this.order[iorder] = oneplate;
        iorder++;
      }
    }
    // console.log('ordeeeeeeeeers', this.order);
    const success = (response: any = []) => {
      console.log("response", response);
      this.list = response.data;
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      // this.message = 'erreur';
    }
    this.clientservice.save(this.order).subscribe(success, error);
  }

}
