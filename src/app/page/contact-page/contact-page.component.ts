import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  company: string;
  email: string;
  name: string;
  message: string;
  waitResponse: boolean = false;

  constructor(private contact: ContactService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) { 
    this.waitResponse = true;
    this.contact.postMessageContact(form.value)
      .subscribe(response => {
        location.href = 'https://mailthis.to/confirm'
      this.waitResponse = false;
      }, error => {
      console.log({ error })
      })
  }
}
