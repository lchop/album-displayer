import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../albums/album.model';
import { AlbumService } from '../albums/album.service';

@Component({
  selector: 'app-description-album-page',
  templateUrl: './description-album-page.component.html',
  styleUrls: ['./description-album-page.component.scss']
})
export class DescriptionAlbumPageComponent implements OnInit {

  album !: Album;
  constructor(
    private route: ActivatedRoute, // récupérez le service route
    private aS: AlbumService // récupérez le service
    ) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.aS.getAlbum(id).subscribe(album => {
      if (album) {
        this.album = album;
      }});
    }
  }
}
