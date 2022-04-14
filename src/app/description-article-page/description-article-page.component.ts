import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../articles/article.model';
import { ArticleService } from '../articles/articles.service';

@Component({
  selector: 'app-description-article-page',
  templateUrl: './description-article-page.component.html',
})
export class DescriptionArticlePageComponent implements OnInit {

  article !: Article;
  constructor(
    private route: ActivatedRoute, // récupérez le service route
    private aS: ArticleService // récupérez le service
    ) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.aS.getArticle(id).subscribe(article => {
      if (article) {
        this.article = article;
      }});
    }
  }
}
