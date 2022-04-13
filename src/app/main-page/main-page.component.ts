import { Component, OnInit } from '@angular/core';
import { Album } from '../albums/album.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  albumPlaying = {} as Album;
  currentAlbumPage = 1;
  durationPlay = '';

  constructor() { }

  ngOnInit(): void {
  }

  setCurrentAlbumPage(page: number): void {
    this.currentAlbumPage = page;
  }

  onPlay(event: Album): void {
    this.albumPlaying = event;
  }

  onDurationStart(event: string): void {
    this.durationPlay = event;
  }

}
