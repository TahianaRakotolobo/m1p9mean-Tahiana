import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ClientService } from '../service/client.service';
import { RestaurantService } from '../service/restaurant.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  word = '';
  list = '';

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

}
