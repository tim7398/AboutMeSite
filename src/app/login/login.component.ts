import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = false;
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

  }

  onRegister(): void {
    const headers = new Headers();
    let Alert;
    headers.append('Content-Type', 'application/json; charset=utf-8');
    const requestOptions = new RequestOptions({ headers: headers });
    this.userInfo.register = true;
    let response;

    this.http.post('/api/userverify', JSON.stringify(this.userInfo), requestOptions)
      .subscribe((data) => {
        console.log("Hello", data.ok);
        //if there was an error, display the message
        response = data.json();

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
