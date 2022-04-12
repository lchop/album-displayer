import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Album } from './album.model';
import { AlbumService } from './album.service';
import { ALBUMS } from './mock-albums';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();

  titlePage: string = "- Albums Music -";
  selectedAlbum!: Album;
  albums!: Album[];
  count =0;
  searchFound = 0;
  word = '';

  constructor(private albumService: AlbumService) { 
    this.albums = albumService.getAlbums();
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
