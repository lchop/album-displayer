import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username :string ='';
  password :string ='';
  loginSucess = false;

  constructor(private auth: AuthServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let result = this.auth.signIn(form.value['username'], form.value['password']);
    result.then(res => {
      if(res)
      {
        this.loginSucess = true;
      }
    });
    this.username = '';
    this.password = '';
  }
}
