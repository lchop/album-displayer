import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { interval, Observable, Subscription, take } from 'rxjs';
import { Article } from './article.model';
import { ArticleService } from './articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
})
export class ArticlesComponent implements OnInit {

  articles!: Article[];

  @Input() set currentPage(value: number) {
    this.articleService
      .paginate(value, 2)
      .subscribe((articles) => (this.articles = articles));
  }
  @Output() onPlay: EventEmitter<Article> = new EventEmitter();
  @Output() onDurationStart: EventEmitter<string> = new EventEmitter();

  selectedAlbum!: Article;

  observableDuration$!: Observable<number>;

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
      }
        );
  }

  onTyping(event: any) {
    if (event.target.value.length > 0) {
      this.articleService
        .searchArticles(event.target.value)
        .subscribe((articles) => (this.articles = articles));
      this.searchFound = this.articles.length;
    } else {
      this.articleService
        .getArticles()
        .subscribe((articles) => (this.articles = articles));
      this.searchFound = 0;
    }
  }

  onSubmit(albumName: NgForm): void {
    if (albumName.value['word'] !== '') {
      this.articleService
        .searchArticles(albumName.value['word'])
        .subscribe((articles) => (this.articles = articles));
      if (this.articles.length > 0) {
        this.searchFound = this.articles.length;
      } else {
        this.articleService
          .getArticles()
          .subscribe((articles) => (this.articles = articles));
        this.searchFound = 0;
      }
    } else {
      this.articleService
        .getArticles()
        .subscribe((articles) => (this.articles = articles));
      this.searchFound = 0;
    }
  }
}
