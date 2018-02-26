import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = true;
  userInfo: any = {
    username: "",
    email: "",
    company: "",
    password: "",
    confirmPW: ""
  };
  registerFail: boolean = false;

  constructor(private http: Http, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'material';
    this.toastyConfig.position = 'bottom-right';
  }
  newToast(Alert): void {
    console.log("HELLO GOT IN HERE:");
    let toastOptions: ToastOptions = {
      title: Alert.title,
      msg: Alert.msg,
      showClose: Alert.showClose,
      timeout: Alert.timeout,
      theme: Alert.theme,
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };

    if (Alert.success) {
      this.toastyService.success(toastOptions);
      return;
    }
    this.toastyService.error(toastOptions);

  }
  ngOnInit() {
  }

  onLogin(): void {

    const headers = new Headers();
    let Alert;
    headers.append('Content-Type', 'application/json; charset=utf-8');
    const requestOptions = new RequestOptions({ headers: headers });
    this.userInfo.register = false;
    let response;

    this.http.post('/api/userverify', JSON.stringify(this.userInfo), requestOptions)
      .subscribe((data) => {
        //if there was an error, display the message
        if(data["_body"]==='true'){
          console.log("hi")
        Alert = {
          title: 'Successful Login',
          showClose: true,
          timeout: 5000,
          theme: 'material',
          success: true
        }

        this.newToast(Alert);
      }
      else{
        Alert = {
          title: 'Incorrect Username or Password',
          showClose: true,
          timeout: 10000,
          theme: 'material',
          success: false
        }

        this.newToast(Alert);
      }
      return;
      },
      err => {

        console.log("error on register:", err)
        return;

      });
    
  }

  onRegister(): void {
    const headers = new Headers();
    let Alert;
    headers.append('Content-Type', 'application/json; charset=utf-8');
    const requestOptions = new RequestOptions({ headers: headers });
    this.userInfo.register = true;
    let response;
    //****** REDIRECT TO HOME PAGE WITH *****WELCOME USERNAME**** */
    this.http.post('/api/userverify', JSON.stringify(this.userInfo), requestOptions)
      .subscribe((data) => {
        //if there was an error, display the message
        
        Alert = {
          title: 'Successful Registration',
          showClose: true,
          timeout: 5000,
          theme: 'material',
          success: true
        }

        this.newToast(Alert);
        return;
      },
      err => {

        console.log("error on register:", response)

        this.registerFail = true;

        // Alert message for failure
        Alert = {
          title: 'Registration Error',
          msg: err._body,
          showClose: true,
          timeout: 500000,
          theme: 'material',
          success: false
        }

        this.newToast(Alert);

      });

  }
}
