import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-ordered',
  templateUrl: './ordered.component.html',
  styleUrls: ['./ordered.component.css']
})
export class OrderedComponent implements OnInit {

  list = new Array();

  constructor(private router: Router, private clientservice:ClientService) { }

  ngOnInit(): void {
    this.getOrders();
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
    this.clientservice.getOrders(Number(localStorage.getItem('id'))).subscribe(success, error);
  }

  delete(id:number){}

}
