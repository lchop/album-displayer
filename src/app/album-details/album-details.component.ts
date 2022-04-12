import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Album } from '../albums/album.model';
import { AlbumService } from '../albums/album.service';
import { ALBUMS } from '../albums/mock-albums';
import { ALBUM_LISTS, List } from '../albums/mock-albums';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnChanges, OnInit{

  @Input() album!: Album;
  albumLists!: Album[];
  songs: string[] | undefined;
 
  constructor(private albumService: AlbumService) {
   }

   ngOnInit(): void {
    this.albumLists = this.albumService.getAlbums();
   }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['album'].currentValue)
    {
      this.songs = this.albumService.getAlbumList(changes['album'].currentValue.id);
    };
  }
}
