import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  loggedIn = false;
  logInName= '';

  constructor(private auth: AuthServiceService) {
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
