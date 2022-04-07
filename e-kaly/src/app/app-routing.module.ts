import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewplateComponent } from './newplate/newplate.component';
import { PlateComponent } from './plate/plate.component';
import { AllplatesComponent } from './allplates/allplates.component';

const routes: Routes = [
  { path: '', redirectTo:'accueil', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'newplate', component: NewplateComponent },
  { path: 'plate', component: PlateComponent },
  { path: 'allplates', component: AllplatesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
