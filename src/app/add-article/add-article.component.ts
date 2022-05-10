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

  constructor(private db: AngularFireDatabase, private articleService: ArticleService) {
    this.articleService.getCountArticles().subscribe((count) => {
      this.id = count.toString();
      console.log(this.id);
    });
   }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(this.id);
    
    const itemsRef = this.db.list(`articles`);
    const newArticle : Article = {'id' : this.id,
                                'status' : 'Published',
                                'title' : form.value['title'], 
                                'description': form.value['description'], 
                                'creationDate': form.value['creationDate']};
    itemsRef.set(this.id, newArticle);
  }

}
