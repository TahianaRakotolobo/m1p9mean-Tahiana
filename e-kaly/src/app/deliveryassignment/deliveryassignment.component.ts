import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-deliveryassignment',
  templateUrl: './deliveryassignment.component.html',
  styleUrls: ['./deliveryassignment.component.css']
})
export class DeliveryassignmentComponent implements OnInit {

  list = new Array();
  deliverymen = new Array();
  nb = 0;

  constructor(private router: Router, private adminservice:AdminService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    this.getOrders();
    this.getDeliverymen();
  }

  getOrders(){
    const success = (response: any = []) => {
      console.log("response", response);
      this.list = response.data;
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      // this.message = 'erreur';
    }
    this.adminservice.getAllOrders().subscribe(success, error);
  }

  getDeliverymen(){
    const success = (response: any = []) => {
      console.log("response", response);
      this.deliverymen = response.data;
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      // this.message = 'erreur';
    }
    this.adminservice.getDeliverymen().subscribe(success, error);
  }

  getNb(id:number){
    const success = (response: any = []) => {
      console.log("response", response);
      this.nb = response.data;
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      // this.message = 'erreur';
    }
    this.adminservice.getNbDelivery(id).subscribe(success, error);
  }

}
