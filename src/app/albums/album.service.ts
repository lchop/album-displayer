import { Injectable } from '@angular/core';
import { Album } from './album.model';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor() { }

  sendCurrentNumberPage = new Subject<number>();

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }

  getAlbums(): Album[] {
    return ALBUMS.sort((a,b)=> a.title.localeCompare(b.title));
  }

  getAlbum(id: string): Album | undefined {
    return ALBUMS.find(album => album.id === id);
  }

  getAlbumList(id: string) : string[] | undefined {
    return ALBUM_LISTS.find(elem => elem.id === id)?.list;
  }

  getCountAlbums(): number {
    return ALBUMS.length;
  }

  searchAlbums(word: string): Album[] {
    return ALBUMS.filter(album => album.title.toLowerCase().includes(word.toLowerCase()));
  }

  paginate(page: number, size: number): Album[] {
    return ALBUMS.slice((page - 1) * size, page * size);
  }
}
