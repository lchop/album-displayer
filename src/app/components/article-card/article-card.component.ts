import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Article } from '../articles/article.model';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html'
})
export class ArticleCardComponent implements OnInit {

  hasFile = true;
  loggedIn = false
  article: Article;
  @Input() set inputArticle(article: Article) {
    if (!article.fileName){
      this.hasFile = false;
    }
    if (!article.imageName){
      article.imageName = 'assets/images/default-image.png';
    }
   this.article = article;
 }

  constructor(private auth: AuthService) {
    this.auth.isLogIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
   }

  ngOnInit(): void {
  }

}
