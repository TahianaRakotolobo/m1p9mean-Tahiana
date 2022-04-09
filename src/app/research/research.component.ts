import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ClientService } from '../service/client.service';
import { RestaurantService } from '../service/restaurant.service';
import { ActivatedRoute } from "@angular/router";
import { Order } from 'src/app/class/order';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  word = '';
  idresto = -1; 
  list = new Array();
  nb = new Array();
  order = new Array();
  place = '';

  constructor(private router: Router, private route: ActivatedRoute, private userservice:UserService, private clientservice:ClientService, private restoservice:RestaurantService) { }

  ngOnInit(): void {
    this.route.queryParams.forEach(param => {
      this.word = param['search'];
    });
    this.research();
  }

  research(){
    const success = (response: any = []) => {
      console.log("response", response);
      this.list = response.data;
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      // this.message = 'erreur';
    }
    this.userservice.research(this.word).subscribe(success, error);
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  valider(){
    if(localStorage.getItem('id')==null || Number(localStorage.getItem('id'))==-1){
      this.router.navigateByUrl('/login');
    }
    console.log(this.nb);
    let iorder = 0;
    for(let i=0; i<this.list.length; i++){
      // console.log(this.nb[i]);
      if(this.nb[i]>0){
        var oneplate = new Order(this.list[i].id, this.nb[i],Number(localStorage.getItem('id')), Number(this.idresto), new Date(), this.place, 'commande');
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
