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
  mainClicked = false;
  aboutClicked = false;
  articlesClicked = false;
  contactClicked = false;
  loginClicked = false;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.isLogIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      switch(event.url){
      case '/':
        this.mainClicked = true;
        this.aboutClicked = false;
        this.articlesClicked = false;
        this.loginClicked = false;
        break;
      case '':
        this.mainClicked = true;
        this.aboutClicked = false;
        this.articlesClicked = false;
        this.loginClicked = false;
        break;
        case '/sachem':
          this.articlesClicked = false;
          this.mainClicked = false;
          this.aboutClicked = true;
          this.loginClicked = false;
          this.contactClicked = false;
          break;
      case '/articles':
        this.articlesClicked = true;
        this.mainClicked = false;
        this.aboutClicked = false;
        this.loginClicked = false;
        this.contactClicked = false;
        break;
      case '/login':
        this.loginClicked = true;
        this.mainClicked = false;
        this.aboutClicked = false;
        this.articlesClicked = false;
        this.contactClicked = false;
        break;
      case '/contact':
        this.contactClicked = true;
        this.loginClicked = false;
        this.mainClicked = false;
        this.aboutClicked = false;
        this.articlesClicked = false;
        break;
      default:
        this.contactClicked = false;
        this.mainClicked = false;
        this.aboutClicked = false;
        this.articlesClicked = false;
        this.loginClicked = false;
        break;
      }
    });
  }
}
