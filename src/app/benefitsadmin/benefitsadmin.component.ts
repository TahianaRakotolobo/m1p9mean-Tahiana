import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-benefitsadmin',
  templateUrl: './benefitsadmin.component.html',
  styleUrls: ['./benefitsadmin.component.css']
})
export class BenefitsadminComponent implements OnInit {

  filtre = 'mois';
  data = new Array();

  constructor(private router: Router, private restoService:RestaurantService) { }

  ngOnInit(): void {
    this.filtrer();
  }

  filtrer(){
    console.log('signup function');
    var response = true;
    const success = (response: any = []) => {
      console.log("response", response);
      this.data = response.data;
      this.router.navigateByUrl('/accueil');
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
    }
    this.restoService.filtrer(this.filtre, Number(localStorage.getItem('id'))).subscribe(success, error);

  }

}
