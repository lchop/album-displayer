import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { interval, Observable, Subscription, take } from 'rxjs';
import { Album } from './album.model';
import { AlbumService } from './album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  albums!: Album[];

  @Input() set currentPage(value: number) {
    this.albumService
      .paginate(value, 2)
      .subscribe((albums) => (this.albums = albums));
  }
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();
  @Output() onDurationStart: EventEmitter<string> = new EventEmitter();

  titlePage: string = '- Albums Music -';
  selectedAlbum!: Album;

  observableDuration$!: Observable<number>;

  count = 0;
  searchFound = 0;
  word = '';

  subscription!: Subscription;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService
      .getCountAlbums()
      .subscribe((count) => (this.count = count));
  }

  onTyping(event: any) {
    if (event.target.value.length > 0) {
      this.albumService
        .searchAlbums(event.target.value)
        .subscribe((albums) => (this.albums = albums));
      this.searchFound = this.albums.length;
    } else {
      this.albumService
        .getAlbums()
        .subscribe((albums) => (this.albums = albums));
      this.searchFound = 0;
    }
  }

  onClick(album: Album): void {
    this.selectedAlbum = album;
    this.observableDuration$ = interval(1000).pipe(
      take(this.selectedAlbum.duration + 1)
    );

    if (this.subscription != undefined) this.subscription.unsubscribe();
    if (this.observableDuration$ !== undefined) {
      this.subscription = this.observableDuration$.subscribe({
        next: (num) => {
          if (num < this.selectedAlbum.duration) {
            let convertTime = `${Math.floor(num / 60)} min ${num % 60} s`;
            this.onDurationStart.emit(convertTime);
          } else {
            this.onDurationStart.emit('');
          }
        },
      });
    }
    this.onPlay.emit(album); // émettre un album vers le parent
  }

  onSubmit(albumName: NgForm): void {
    if (albumName.value['word'] !== '') {
      this.albumService
        .searchAlbums(albumName.value['word'])
        .subscribe((albums) => (this.albums = albums));
      if (this.albums.length > 0) {
        this.searchFound = this.albums.length;
      } else {
        this.albumService
          .getAlbums()
          .subscribe((albums) => (this.albums = albums));
        this.searchFound = 0;
      }
    } else {
      this.albumService
        .getAlbums()
        .subscribe((albums) => (this.albums = albums));
      this.searchFound = 0;
    }
  }
}
