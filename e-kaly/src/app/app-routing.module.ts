import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewplateComponent } from './newplate/newplate.component';
import { PlateComponent } from './plate/plate.component';
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

const routes: Routes = [
  { path: '', redirectTo:'accueil', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'newplate', component: NewplateComponent },
  { path: 'plate', component: PlateComponent },
  { path: 'allplates', component: AllplatesComponent },
  { path: 'ordered', component: OrderedComponent },
  { path: 'clientorder', component: ClientordersComponent },
  { path: 'orderdetails', component: OrderdetailsComponent },
  { path: 'assignment', component: DeliveryassignmentComponent },
  { path: 'myassignment', component: AssignmentComponent },
  { path: 'deliverydetails', component: DeliverydetailsComponent },
  { path: 'research', component: ResearchComponent },
  { path: 'restobenefits', component: BenefitsrestoComponent },
  { path: 'adminbenefits', component: BenefitsadminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
