import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {
  loggedIn = false;
  logInName= '';
  mainClicked = false;
  aboutClicked = false;
  articlesClicked = false;

  constructor(private auth: AuthService, private router: Router) {
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
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      switch(event.url){
      case '/':
        this.mainClicked = true;
        this.aboutClicked = false;
        this.articlesClicked = false;
        break;
      case '':
        this.mainClicked = true;
        this.aboutClicked = false;
        this.articlesClicked = false;
        break;
        case '/sachem':
          this.articlesClicked = false;
          this.mainClicked = false;
          this.aboutClicked = true;
          break;
      case '/articles':
        this.articlesClicked = true;
        this.mainClicked = false;
        this.aboutClicked = false;
        break;
      default:
        this.mainClicked = false;
        this.aboutClicked = false;
        this.articlesClicked = false;
        break;
      }
    });
  }
}
