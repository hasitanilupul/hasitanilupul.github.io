import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() {
  }

  static convertToFormData(form): FormData {
    const formData = new FormData();
    Object.keys(form).forEach(element => {
      if (element && form[element]) {
        console.log(form[element] + '->' + element);
        formData.append(element, form[element]);
      }
    });
    return formData;
  }
}
