import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username :string ='';
  password :string ='';
  loginSucess$ : Observable<boolean>;

  constructor(private auth: AuthServiceService) {
    this.loginSucess$ = this.auth.isLogIn$;
   }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.auth.signIn(form.value['username'], form.value['password']);    
    this.username = '';
    this.password = '';
  }
}
