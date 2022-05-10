import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  title = '';
  content= '';
  date = new Date();

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

}
