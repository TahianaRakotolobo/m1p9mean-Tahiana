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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    RegisterComponent,
    NewplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
