import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { interval, map, Observable, Subject, Subscription, take, timeInterval } from 'rxjs';
import { Album } from './album.model';
import { AlbumService } from './album.service';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  albums!: Album[];
    
  @Input() set currentPage(value: number){
      console.log(value);
      this.albums = this.albumService.paginate(value,2);
  }
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();
  @Output() onDurationStart: EventEmitter<string> = new EventEmitter();


  titlePage: string = "- Albums Music -";
  selectedAlbum!: Album;

  observableDuration$!: Observable<number>;
  
  count =0;
  searchFound = 0;
  word = '';


  subscription !:Subscription;

  constructor(private albumService: AlbumService) { 
    this.count = albumService.getCountAlbums();
  }

  ngOnInit(): void {
  }

  onTyping(event: any)
  {
    if (event.target.value.length > 0) {
      let search = this.albumService.searchAlbums(event.target.value);
      this.albums = search;
      this.searchFound = search.length;
    }
    else
    {
      this.albums = this.albumService.getAlbums();
      this.searchFound = 0;
    }
  }

  onClick(album: Album): void {
    this.selectedAlbum = album;
    this.observableDuration$ = interval(1000).pipe(take(this.selectedAlbum.duration + 1));

    if(this.subscription != undefined)
      this.subscription.unsubscribe();
    if (this.observableDuration$ !== undefined) {
      this.subscription = this.observableDuration$.subscribe({
        next: (num) =>  {
          if ( num < this.selectedAlbum.duration) {
            let convertTime = `${Math.floor(num / 60)} min ${num % 60} s`;
            this.onDurationStart.emit(convertTime);

          }
          else {
            this.onDurationStart.emit('');
          }
        }
      });
    }
    this.onPlay.emit(album); // émettre un album vers le parent
  }

  onSubmit(albumName: NgForm): void {
    if(albumName.value['word'] !== "") {
      let search = this.albumService.searchAlbums(albumName.value['word'])
      if (search.length > 0) {
        this.albums = search;
        this.searchFound = search.length;
      }
      else
      {
        this.albums = this.albumService.getAlbums();
        this.searchFound = 0;
      }
    }
    else
    {
      this.albums = this.albumService.getAlbums();
      this.searchFound = 0;
    }
  }
}
