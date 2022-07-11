import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {
  loggedIn = false;
  logInName= '';

  constructor(private auth: AuthService) {
    this.auth.isLogIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        this.auth.user$.subscribe(user => {
          this.logInName = user.email.search('@') > 0 ? user.email.substring(0, user.email.search('@')) : user.email;
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
