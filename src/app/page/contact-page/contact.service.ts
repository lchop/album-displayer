import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  aliasMailThis = 'https://getform.io/f/fef7686d-979e-4e14-b0be-48b6eeed6549';

  constructor( private httpCLient: HttpClient) { }

  postMessageContact(input: any){
    return this.httpCLient.post(this.aliasMailThis, input, {responseType: 'text'}).pipe(
      map((response) => {
        location.href = 'https://getform.io/thank-you'
        return response;
      },
      (error : any) => {
        return error;
      }
      ));
  }
}
