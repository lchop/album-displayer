import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Article } from '../articles/article.model';
import { ArticleService } from '../articles/articles.service';


@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
})
export class ArticleDetailsComponent implements OnChanges, OnInit{

  @Input() article!: Article;
  articleLists!: Article[];
  articleContent: string[] | undefined;
 
  constructor(private articleService: ArticleService) {
   }

   ngOnInit(): void {
    this.articleService.getArticles().subscribe(articles => this.articleLists = articles);
   }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['album'].currentValue)
    {
      this.articleService.getArticleList(changes['album'].currentValue.id).subscribe(contents => this.articleContent = contents);
    };
  }
}
