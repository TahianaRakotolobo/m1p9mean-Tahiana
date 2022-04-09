import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ClientService } from '../service/client.service';
import { RestaurantService } from '../service/restaurant.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  idclient = -1;
  list = new Array();

  constructor(private router: Router, private route: ActivatedRoute, private restoservice:RestaurantService) { }

  ngOnInit(): void {
    this.route.queryParams.forEach(param =>
      this.idclient = param['idclient']
    );
    this.getOrderDetails();
  }

  getOrderDetails(){
    const success = (response: any = []) => {
      console.log("response", response);
      this.list = response.data;
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      // this.message = 'erreur';
    }
    this.restoservice.getClientResto(Number(localStorage.getItem('id')), this.idclient).subscribe(success, error);
  }

  valider(){
    const success = (response: any = []) => {
      console.log("response", response);
      // this.list = response.data;
      this.router.navigateByUrl('/clientorder');
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      // this.message = 'erreur';
    }
    this.restoservice.change(Number(localStorage.getItem('id')), this.idclient).subscribe(success, error);
  }
}
