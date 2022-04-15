import { Component, Input, OnInit } from '@angular/core';
import { interval, Observable, take } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() slides!: any[];

  observableCarousel$!: Observable<number>;



  constructor() { }

  ngOnInit(): void {
    this.observableCarousel$ = interval(3000);
    this.observableCarousel$.subscribe((time) => {
      this.slides.push(this.slides.shift());
      {}
    });
  }

}
