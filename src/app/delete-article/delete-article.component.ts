import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../articles/article.model';
import { ArticleService } from '../articles/articles.service';

@Component({
  selector: 'app-delete-article',
  templateUrl: './delete-article.component.html',
  styleUrls: ['./delete-article.component.scss']
})
export class DeleteArticleComponent implements OnInit {

  articles$: Observable<Article[]>;

  constructor(private articleService: ArticleService) {
    this.articles$ = this.articleService.getArticles();
   }

  ngOnInit(): void {
  }

  onDeleteArticleClick(article: Article) {
    this.articleService.deleteArticle(article);
  }


}
