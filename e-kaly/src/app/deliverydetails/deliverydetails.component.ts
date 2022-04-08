import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService } from '../service/delivery.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-deliverydetails',
  templateUrl: './deliverydetails.component.html',
  styleUrls: ['./deliverydetails.component.css']
})
export class DeliverydetailsComponent implements OnInit {

  idclient = -1;
  idresto = -1;
  list = new Array();

  constructor(private router: Router, private route: ActivatedRoute, private deliveryservice:DeliveryService) { }

  ngOnInit(): void {
    this.route.queryParams.forEach(param => {
      this.idclient = param['idclient'];
      this.idresto = param['idresto'];
    });
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
    this.deliveryservice.getDeliverydetails(this.idresto, this.idclient).subscribe(success, error);
  }

  delivering(state:string){
    const success = (response: any = []) => {
      console.log("response", response);
      // this.list = response.data;
      if(state == "en cours"){
        location.reload();
      }else{
        this.router.navigateByUrl('/myassignment');
      }
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      // this.message = 'erreur';
    }
    this.deliveryservice.change(this.idresto, this.idclient, state).subscribe(success, error);
  }

}
