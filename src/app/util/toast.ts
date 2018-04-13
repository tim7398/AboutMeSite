import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable()


class MessageAlert{
    constructor( private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'material';
        this.toastyConfig.position = 'bottom-right';
      }
    
    //to make a new alert
    newToast(Alert): void {

        console.log("HELLO GOT IN HERE:, ", Alert);
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
}

 export {MessageAlert}