import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html'
  })
export class AboutPageComponent implements OnInit {

  public slides = [
    { src: "/assets/images/greenMag.jpeg" },
    { src: "/assets/images/guyaMag.png" },
    { src: "/assets/images/ewag.webp" },
    { src: "/assets/images/shopping-fr.png" },
    { src: "/assets/images/resto-avenue.png" }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
