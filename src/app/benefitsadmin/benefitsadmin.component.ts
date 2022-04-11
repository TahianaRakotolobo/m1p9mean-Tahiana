import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-benefitsadmin',
  templateUrl: './benefitsadmin.component.html',
  styleUrls: ['./benefitsadmin.component.css']
})
export class BenefitsadminComponent implements OnInit {

  filtre = 'resto';
  data = new Array();
  pourcentage = 1;

  constructor(private router: Router, private adminService:AdminService) { }

  ngOnInit(): void {
    this.filtrer();
  }

  filtrer(){
    console.log('signup function');
    var response = true;
    const success = (response: any = []) => {
      console.log("response", response);
      this.data = response.data;
      this.calculer();
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
    }
    this.adminService.filtrer(this.filtre).subscribe(success, error);

  }

  calculer(){
    for(var i=0; i<this.data.length; i++){
      this.data[i].total = (this.data[i].total * this.pourcentage)/100;
    }
  }

}
