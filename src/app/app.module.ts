import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {ContactMeComponent} from './contact-me/contact-me.component';
import { HomeComponent } from './home/home.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ToastyModule} from 'ng2-toasty';
import { AboutmeComponent } from './aboutme/aboutme.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PastProjectComponent } from './past-project/past-project.component';
import { LoginComponent } from './login/login.component';
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contactme', component: ContactMeComponent },
  { path: 'aboutme', component: AboutmeComponent},
  {path:'pastproject', component:PastProjectComponent},
  {path:'login', component:LoginComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    ContactMeComponent,
    HomeComponent,
    AboutmeComponent,
    PastProjectComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ToastyModule.forRoot(),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  schemas:[NO_ERRORS_SCHEMA],
  exports:[
    BrowserModule, ToastyModule, MDBBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
