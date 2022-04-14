import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ArticleService } from '../articles/articles.service';


@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {

  perPage : number = 2;
  page: number = 1;
  max_page: number = 0;
  
  @Output() currentPage: EventEmitter<number> = new EventEmitter();

  constructor(private articleService: ArticleService) { 
    articleService.sendCurrentNumberPage.subscribe(numberPage => {this.perPage});
  }

  ngOnInit(): void {
    this.articleService.getCountArticles().subscribe(count => this.max_page = count / this.perPage);
  }
  
  next() {
    if(this.page < this.max_page) {
      this.page = this.page + 1;
    }
    else
    {
      this.page = 1;
    }
    this.currentPage.emit(this.page);

  }

  previous() {
    if(this.page > 1) {
      this.page = this.page - 1;
    }
    else
    {
      this.page = this.max_page;
    }
    this.currentPage.emit(this.page);
  }

}
