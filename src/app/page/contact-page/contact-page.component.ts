import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html'
})
export class ContactPageComponent implements OnInit {
  company: string = '';
  email: string = '';
  name: string = '';
  message: string = '';
  waitResponse: boolean = false;
  isDisabled = true;

  correctMail = true;
  correctName = true;
  correctCompany = true;
  correctMessage = true;

  constructor(private contact: ContactService) { }

  ngOnInit(): void {
  }

  onKeyUp(fromInput: string) {
    this.checkInput(fromInput);
  }

  checkInput(fromInput: string) : boolean{
      switch (fromInput) {
        case 'name':
          const name = /^[a-zA-Z_ -]{2,}$/.test(this.name)
          if(name){
            this.correctName = true;
          } else{
            this.correctName = false;
          }
          break;
        case 'email':
          const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
          if (email) {
            this.correctMail = true;
          } else {
            this.correctMail = false;
          }
          break;
        case 'company':
          const company = /^[\w_ -]{2,}$/.test(this.company)
          if (company) {
            this.correctCompany = true;
          } else {
            this.correctCompany = false;
          }
          break;
        case 'message':
          const message =  this.message.length >= 2? true : false;
          if (message) {
            this.correctMessage = true;
          } else {
            this.correctMessage = false;
          }
          break;
        default:
          break;
      }
      if (this.correctMessage && this.correctCompany && this.correctName && this.correctMail) {
        this.isDisabled = false;
        return true;
      }
      else
      {
        this.isDisabled = true;
        return false;
      }
    }

  onSubmit(form: NgForm) {
    if (this.checkInput('email') && this.checkInput('name') 
    && this.checkInput('company') && this.checkInput('message')) {      
      this.waitResponse = true;
      form.value.company.test;
      this.contact.postMessageContact(form.value)
        .subscribe(response => {
        this.waitResponse = false;
        }, error => {
        console.log({ error })
        })
    }
  }
}
