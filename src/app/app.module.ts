import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { NewplateComponent } from './newplate/newplate.component';
import { PlateComponent } from './plate/plate.component';
import { CommonModule } from '@angular/common';
import { AllplatesComponent } from './allplates/allplates.component';
import { OrderedComponent } from './ordered/ordered.component';
import { ClientordersComponent } from './clientorders/clientorders.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { DeliveryassignmentComponent } from './deliveryassignment/deliveryassignment.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { DeliverydetailsComponent } from './deliverydetails/deliverydetails.component';
import { ResearchComponent } from './research/research.component';
import { BenefitsrestoComponent } from './benefitsresto/benefitsresto.component';
import { BenefitsadminComponent } from './benefitsadmin/benefitsadmin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    RegisterComponent,
    NewplateComponent,
    PlateComponent,
    AllplatesComponent,
    OrderedComponent,
    ClientordersComponent,
    OrderdetailsComponent,
    DeliveryassignmentComponent,
    AssignmentComponent,
    DeliverydetailsComponent,
    ResearchComponent,
    BenefitsrestoComponent,
    BenefitsadminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
