import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../articles/article.model';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html'
})
export class ArticleCardComponent implements OnInit {
  @Input() article: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
