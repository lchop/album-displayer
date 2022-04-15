import { Component, OnInit } from '@angular/core';
import { Article } from '../articles/article.model';
import { ArticleService } from '../articles/articles.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  lastArticle = new Article();

  public slides = [
    { src: "/assets/images/greenMag.jpeg" },
    { src: "/assets/images/guyaMag.png" },
    { src: "/assets/images/greenMag.jpeg" },
    { src: "/assets/images/guyaMag.png" }
  ];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService
      .getLastArticle()
      .subscribe((article) => {
        this.lastArticle = article;
      });
  }
}
