import { Component, OnInit } from '@angular/core';
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
  
  onClick(name: string){
    switch(name){
      case 'accueil':
        this.mainClicked = true;
        this.aboutClicked = false;
        this.articlesClicked = false;
        break;
      case 'about':
        this.aboutClicked = true;
        this.mainClicked = false;
        this.articlesClicked = false;
        break;
      case 'articles':
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
  }
}
