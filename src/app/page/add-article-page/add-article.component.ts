import { Component } from '@angular/core';

@Component({
  selector: 'app-add-article-page',
  templateUrl: './add-article.component.html',
})
export class AddArticlePageComponent {
  articleAdded = false;
  
  constructor() { 
  }

  onArticleAdded(event: boolean){
    this.articleAdded = event;
  }


}
