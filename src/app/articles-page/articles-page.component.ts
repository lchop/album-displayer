import { Component, OnInit } from '@angular/core';
import { Article } from '../articles/article.model';
import { ArticleService } from '../articles/articles.service';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent implements OnInit {

  lastArticle = new Article();
  currentArticlePage = 1;
  currentCountArticles: number;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService
      .getLastArticle()
      .subscribe((article) => {
        this.lastArticle = article;
      });
  }

  setCurrentArticlePage(page: number): void {
    this.currentArticlePage = page;
  }

  updateCountArticles(countArticles: number)
  {
    this.currentCountArticles = countArticles;
  }

  updateCurrentPage(page: number)
  {
    this.currentArticlePage = page;
  }

}
