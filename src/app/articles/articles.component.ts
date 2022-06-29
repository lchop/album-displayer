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

  @Input() set currentPage(value: number) {
    this.actualPage = value;
    this.articleService
      .paginateFromSearch(this.actualPage, 2, this.searchWord )
      .subscribe((articles) => {
        this.articles = articles;
        });
  }

  actualPage: number = 1;
  searchFound: number = 0;
  searchWord: string = '';

  constructor(private articleService: ArticleService) {
  }

  onTyping(event: any) {
    this.searchWord = event.target.value;
    if (this.searchWord.length > 0) {
      this.articleService
        .paginateFromSearch(this.actualPage, 2, this.searchWord)
        .subscribe((articles) => {
          this.articles = articles;
          this.searchFound = this.articles.length;
          });
      
    } else {
      this.articleService
        .paginateFromSearch(this.actualPage, 2, this.searchWord)
        .subscribe((articles) => {
          this.articles = articles;
          this.searchFound = 0;
          });
    }
  }

  onSubmit(articleName: NgForm): void {
    this.searchWord = articleName.value['word'];
    if (this.searchWord.length > 0) {
        this.articleService
        .paginateFromSearch(this.actualPage, 2, this.searchWord )
        .subscribe((articles) => {
          this.articles = articles;
          this.searchFound = this.articles.length;
          });
    } else {
      this.articleService
        .paginateFromSearch(this.actualPage, 2, this.searchWord )
        .subscribe((articles) => {
          this.articles = articles;
          this.searchFound = 0;
          });
    }
  }
}
