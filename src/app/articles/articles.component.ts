import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from './article.model';
import { ArticleService } from './articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
})
export class ArticlesComponent {

  articles!: Article[];
  articlesOnPage!: Article[];

  @Input() set currentPage(value: number) {
    this.actualPage = value;    
    if (this.searchWord.length > 0) {
      this.articleService
        .search(this.searchWord)
        .subscribe((articles) => {
          this.articles = this.articleService.paginate(articles ,this.actualPage, this.perPage );
          this.searchFound = this.articles.length;
          this.currentCountArticles.emit(this.articles.length);
          });
    }
    else {      
      this.articleService
        .getArticles()
        .subscribe((articles) => {
          this.articles = articles;
          this.articlesOnPage = this.articleService.paginate(articles ,this.actualPage, this.perPage);
          this.searchFound = this.articles.length;
          this.currentCountArticles.emit(this.articles.length);
        }
        );
    }
  }

  @Output() currentCountArticles: EventEmitter<number> = new EventEmitter();
  @Output() updateCurrentPage: EventEmitter<number> = new EventEmitter();

  actualPage: number = 1;
  searchFound: number = 0;
  searchWord: string = '';
  perPage: number = 2;

  constructor(private articleService: ArticleService) {
  }

  onTyping(event: any) {
    this.searchWord = event.target.value;
    this.actualPage = 1;
    this.updateCurrentPage.emit(this.actualPage);
    if (this.searchWord.length > 0) {
      this.articleService
        .search(this.searchWord)
        .subscribe((articles) => {
          this.articles = articles;
          this.articlesOnPage = this.articleService.paginate(articles ,this.actualPage, this.perPage);
          this.searchFound = this.articles.length;
          this.currentCountArticles.emit(this.articles.length);
          });
    } else {
      this.articleService
        .getArticles()
        .subscribe((articles) => {
          this.articles = articles;
          this.articlesOnPage = this.articleService.paginate(articles , this.actualPage, this.perPage);
          this.searchFound = this.articles.length;
          this.currentCountArticles.emit(this.articles.length);
          });
    }
  }

  onSubmit(articleName: NgForm): void {
    this.searchWord = articleName.value['word'];
    this.actualPage = 1;
    this.updateCurrentPage.emit(this.actualPage);
    if (this.searchWord.length > 0) {
        this.articleService
        .search(this.searchWord )
        .subscribe((articles) => {
          this.articles = articles;
          this.articlesOnPage = this.articleService.paginate(articles ,this.actualPage, this.perPage);
          this.searchFound = this.articles.length;
          this.currentCountArticles.emit(this.articles.length);
          });
    } else {
      this.articleService
        .getArticles()
        .subscribe((articles) => {
          this.articles = articles;
          this.articlesOnPage = this.articleService.paginate(articles ,this.actualPage, this.perPage);
          this.searchFound = this.articles.length;
          this.currentCountArticles.emit(this.articles.length);
          });
    }
  }
}
