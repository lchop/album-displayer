import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Article } from 'src/app/components/articles/article.model';
import { ArticleService } from 'src/app/components/articles/articles.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html'
  })
export class AddArticleComponent implements OnInit {

  id = '';
  status = '';
  title = '';
  description= '';
  creationDate = new Date();
  fileName = '';
  imageName = '';
  progressUploadImage = new Observable<number>();
  progressUploadFile = new Observable<number>();
  countSub: Subscription;

  @Output() articleAdded = new EventEmitter<boolean>();

  constructor(private db: AngularFireDatabase, private articleService: ArticleService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.datePipe.transform(this.creationDate, 'dd/MM/yyyy');
  }

  onSubmit(form: NgForm) { 
    const newArticle : Article = {
                              'title' : form.value['title'], 
                              'description': form.value['description'], 
                              'creationDate': form.value['creationDate'],
                              'imageName': this.imageName,
                              'fileName': this.fileName};
  const itemsRef = this.db.object(`articles/${this.title}`);    
  itemsRef.set(newArticle).finally(() => {
    this.articleAdded.emit(true);
  });
  }

  onUploadImage(event: string){
    this.imageName = event;
  }

  onUploadFile(event: string){
    this.fileName = event;
  }

  onProgressUploadImage(event: Observable<number>){
    this.progressUploadImage = event;
  }

  onProgressUploadFile(event: Observable<number>){
    this.progressUploadFile = event;
  }

}
