import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from 'src/app/components/articles/article.model';
import { ArticleService } from 'src/app/components/articles/articles.service';

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.scss']
})
export class SearchArticlesComponent implements OnInit {
  
  @Output() articles: EventEmitter<Article[]> = new EventEmitter();
  @Output() updateCurrentPage: EventEmitter<number> = new EventEmitter();

  actualPage: number = 1;
  searchFound: number = 0;
  searchWord: string = '';


  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles.emit(articles);
      this.searchFound = articles.length;
    });
  }

  onTyping(event: any) {
    this.searchWord = event.target.value;
    this.actualPage = 1;
    this.updateCurrentPage.emit(this.actualPage);
    this.articleService
        .search(this.searchWord)
        .subscribe((articles) => {
          this.articles.emit(articles);
          this.searchFound = articles.length;
          });
    }

  onSubmit(articleName: NgForm): void {
    this.searchWord = articleName.value['word'];
    if (this.searchWord.length > 0) {
        this.articleService
        .search(this.searchWord )
        .subscribe((articles) => {
          this.articles.emit(articles);
          this.searchFound = articles.length;
          });
    } else {
      this.articleService
        .getArticles()
        .subscribe((articles) => {
          this.articles.emit(articles);
          this.searchFound = articles.length;
        });
    }
  }

}
