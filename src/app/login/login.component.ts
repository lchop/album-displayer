import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username :string ='';
  password :string ='';
  loginSucess$ : Observable<boolean>;
  user$ : Observable<User>;
  userName: string;

  constructor(private auth: AuthService) {
    this.loginSucess$ = this.auth.isLogIn$;
    this.user$ = this.auth.user$;
   }

  onSubmit(form: NgForm) {
    this.auth.signIn(form.value['username'], form.value['password']);    
    this.username = '';
    this.password = '';
  }

  onLogout() {
    this.auth.signOut();
  }

}
