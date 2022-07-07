import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  aliasMailThis = 'https://mailthis.to/lchop';

  constructor( private httpCLient: HttpClient) { }

  postMessageContact(input: any){
    return this.httpCLient.post(this.aliasMailThis, input, {responseType: 'text'}).pipe(
      map((response) => {
        return response;
      },
      (error : any) => {
        return error;
      }
      ));
  }
}
