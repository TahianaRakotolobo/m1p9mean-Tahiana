import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { user } from 'src/environments/environment';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  list = new Array();

  constructor(private router: Router, private userservice:UserService) { }

  ngOnInit(): void {
    // console.log("id", user.id);
    this.getAllResto();
  }

  getAllResto(){
    const success = (response: any = []) => {
      this.list = response.data;
    };
    const error = (response: any = []) => {
      console.log("Erreur", response);
      // this.message = 'erreur';
    }
    this.userservice.getResto().subscribe(success, error);
  }
}
