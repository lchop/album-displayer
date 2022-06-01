import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Article } from '../articles/article.model';
import { ArticleService } from '../articles/articles.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  id ='';
  status = '';
  title = '';
  description= '';
  creationDate = new Date();
  imageName = '';
  progressUploadImage = new Observable<number>();

  constructor(private db: AngularFireDatabase, private articleService: ArticleService, private datePipe: DatePipe) { 
   
    this.articleService.getCountArticles().subscribe((count) => {
      this.id = count.toString();
    });
   }

  ngOnInit(): void {
    this.datePipe.transform(this.creationDate, 'dd/MM/yyyy');
  }

  onSubmit(form: NgForm) {
    
    const itemsRef = this.db.list(`articles`);
    const newArticle : Article = {'id' : this.id,
                                'status' : 'Published',
                                'title' : form.value['title'], 
                                'description': form.value['description'], 
                                'creationDate': form.value['creationDate'],
                                'imageName': this.imageName};
    itemsRef.set(this.id, newArticle);
  }

  onUploadImage(event: string){
    this.imageName = event;
  }

  onProgressUploadImage(event: Observable<number>){
    this.progressUploadImage = event;
  }

}
