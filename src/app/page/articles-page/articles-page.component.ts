import { Component, OnInit } from '@angular/core';
import { Article } from '../../components/articles/article.model';
import { ArticleService } from '../../components/articles/articles.service';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent {

  currentArticlePage = 1;
  articles : Article[] = [];
  currentCountArticles: number;

  constructor() {}

  setCurrentArticlePage(page: number): void {
    this.currentArticlePage = page;
  }

  onSearchArticles(articles: Article[]){
    this.articles = articles;
    this.currentCountArticles = articles.length ;
  }

  onUpdateCurrentPage(page: number){
    this.currentArticlePage = page;
  }
}
