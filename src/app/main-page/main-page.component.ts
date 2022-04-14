import { Component, OnInit } from '@angular/core';
import { Article } from '../articles/article.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  lastArticle = {} as Article;
  currentAlbumPage = 1;

  constructor() {}

  ngOnInit(): void {
  }

  setCurrentAlbumPage(page: number): void {
    this.currentAlbumPage = page;
  }
}
