import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { RestaurantService } from '../service/restaurant.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-allplates',
  templateUrl: './allplates.component.html',
  styleUrls: ['./allplates.component.css']
})
export class AllplatesComponent implements OnInit {

  idresto = -1; 
  list = new Array();
  visiblelist = new Array();
  nb = new Array();

  constructor(private router: Router, private route: ActivatedRoute, private userservice:UserService, private restoservice:RestaurantService) { }

  ngOnInit(): void {
    this.idresto = Number(localStorage.getItem('id'));
    this.getAllPlate();
  }

  getVisible(){
    var ivi = 0;
    for(var i=0; i<this.list.length; i++){
      if(this.list[i].visibility == true){
        this.visiblelist[ivi] = this.list[i];
        ivi++;
      }
    }
  }

  getAllPlate(){
    const success = (response: any = []) => {
      console.log("response", response);
      this.list = response.data;
      this.getVisible();
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      // this.message = 'erreur';
    }
    this.restoservice.getAllPlate(this.idresto).subscribe(success, error);
  }

  valider(){}

}
