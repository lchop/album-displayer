import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Article } from './article.model';
import { ArticleService } from './articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
})
export class ArticlesComponent implements OnInit {

  articles!: Article[];

  @Input() set currentPage(value: number) {
    this.actualPage = value;
    this.articleService
      .paginateFromSearch(this.actualPage, 2, '' )
      .subscribe((articles) => (this.articles = articles));
  }
  @Output() onPlay: EventEmitter<Article> = new EventEmitter();
  @Output() onDurationStart: EventEmitter<string> = new EventEmitter();

  actualPage: number = 1;
  selectedAlbum!: Article;
  searchFound: number = 0;

  count = 0;
  word = '';

  subscription!: Subscription;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService
      .getCountArticles()
      .subscribe((count) => {
        this.count = count;
        this.searchFound = count;
      });
  }

  onTyping(event: any) {
    if (event.target.value.length > 0) {
      this.articleService
        .paginateFromSearch(this.actualPage, 2, event.target.value)
        .subscribe((articles) => (this.articles = articles));
      this.searchFound = this.articles.length;
    } else {
      this.articleService
        .paginateFromSearch(this.actualPage, 2, '' )
        .subscribe((articles) => (this.articles = articles));
      this.searchFound = 0;
    }
  }

  onSubmit(articleName: NgForm): void {
    if (articleName.value['word'] !== '') {
        this.articleService
        .paginateFromSearch(this.actualPage, 2, articleName.value['word'] )
        .subscribe((articles) => (this.articles = articles));
      if (this.articles.length > 0) {
        this.searchFound = this.articles.length;
      } else {
        this.articleService
        .paginateFromSearch(this.actualPage, 2, '' )
        .subscribe((articles) => (this.articles = articles));
        this.searchFound = 0;
      }
    } else {
      this.articleService
        .paginateFromSearch(this.actualPage, 2, '' )
        .subscribe((articles) => (this.articles = articles));
      this.searchFound = 0;
    }
  }
}
