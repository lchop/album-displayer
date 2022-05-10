import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  title = '';
  content= '';
  date = new Date();

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {

    this.getMessages().subscribe(data => {
      console.log(data);
    });
  }

  getMessages(): Observable<any> {
    let test = this.db.list('articles');
    return test.valueChanges();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

}
