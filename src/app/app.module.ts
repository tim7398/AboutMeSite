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
import {UserService} from './user.service';
import {AuthGuard} from './auth.guard';
import {MessageAlert} from './util/toast';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material';
import { ProjectModalComponent } from './project-modal/project-modal.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contactme', component: ContactMeComponent },
  { path: 'aboutme', component: AboutmeComponent},
  {path:'pastproject', component:PastProjectComponent,canActivate: [AuthGuard]},
  {path:'login', component:LoginComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    ContactMeComponent,
    HomeComponent,
    AboutmeComponent,
    PastProjectComponent,
    LoginComponent,
    ProjectModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,    
    NoopAnimationsModule,
    MatDialogModule,
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
  entryComponents: [
    ProjectModalComponent,
],
  schemas:[NO_ERRORS_SCHEMA],
  exports:[
    BrowserModule, ToastyModule, MDBBootstrapModule,ProjectModalComponent
  ],
  providers: [UserService,AuthGuard, MessageAlert],
  bootstrap: [AppComponent]
})
export class AppModule { }
