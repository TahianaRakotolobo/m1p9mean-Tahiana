import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { RestaurantService } from '../service/restaurant.service';
import { ActivatedRoute } from "@angular/router";
import { user } from 'src/environments/environment';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.css']
})
export class PlateComponent implements OnInit {

  idresto = -1; 
  list = new Array();
  nb = new Array();

  constructor(private router: Router, private route: ActivatedRoute, private userservice:UserService, private restoservice:RestaurantService) { }

  ngOnInit(): void {
    // console.log("id", user.id);
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
    // console.log("idrestooooo", this.idresto);
    // this.getPlate();
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

}
