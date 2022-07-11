import { Component, Input } from '@angular/core';
import { Article } from './article.model';
import { ArticleService } from './articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
})
export class ArticlesComponent {
  perPage = 2;
  currentPage: number = 1;
  @Input() set inputCurrentPage(page: number) {
    this.currentPage = page;
    this.articlesOnPage = this.articleService.paginate(this.articles, this.currentPage, this.perPage);
  }

  articlesOnPage: Article[] = [];
  articles : Article[] = [];
  @Input() set inputArticles(articles: Article[]) {
    this.articles = articles;  
    this.articlesOnPage = this.articleService.paginate(this.articles, this.currentPage, this.perPage);
  };

  constructor(private articleService: ArticleService) {
  }
}
