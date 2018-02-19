import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {ContactMeComponent} from './contact-me/contact-me.component';
import { HomeComponent } from './home/home.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ToastyModule} from 'ng2-toasty';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contactMe', component: ContactMeComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    ContactMeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ToastyModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports:[
    BrowserModule, ToastyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
