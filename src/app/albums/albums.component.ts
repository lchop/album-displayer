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

  titlePage: string = "Page principale Albums Music";
  selectedAlbum!: Album;
  albums!: Album[];
  count =0;
  searchFound = 0;

  constructor(private albumService: AlbumService) { 
    this.albums = albumService.getAlbums();
    this.count = albumService.getCountAlbums();
  }

  ngOnInit(): void {
  }

  onClick(album: Album): void {
    this.selectedAlbum = album;
    this.onPlay.emit(album); // émettre un album vers le parent
  }

  onSubmit(albumName: NgForm): void {
    console.log(albumName.value);
    let search = this.albumService.searchAlbums(albumName.value['word'])
    if (search.length > 0) {
      this.albums = this.albumService.searchAlbums(albumName.value['word']);
      this.searchFound = search.length;

    }
    else
    {
      this.albums = this.albumService.getAlbums();
      this.searchFound = 0;
    }
  }
}
