import { Injectable } from '@angular/core';
import { Album } from './album.model';
import { ALBUMS, ALBUM_LISTS, List } from './mock-albums';
import { Observable, Subject, map, find } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  sendCurrentNumberPage = new Subject<number>();

  // convention dans l'API ajoutez votre identifant de base de données
  private albumsUrl =
    'https://t20-label-default-rtdb.europe-west1.firebasedatabase.app/albums';
  private albumListsUrl =
    'https://t20-label-default-rtdb.europe-west1.firebasedatabase.app/albumLists';

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl + '.json').pipe(
      map((albums) => {
        return albums.sort((a, b) => {
          return b.duration - a.duration;
        });
      })
    );
  }

  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(this.albumsUrl + `/${id}.json`).pipe(
      map((album) => {
        return album;
      }) // JSON
    );
  }

  getAlbumList(id: string): Observable<string[] | undefined> {
    return this.http.get<List>(this.albumListsUrl + `/${id}.json`).pipe(
      map((album) => {
        return album.list;
      }) // JSON
    );
  }

  getCountAlbums(): Observable<number> {
    return this.http.get<Album[]>(this.albumsUrl + '.json').pipe(
      map((album) => {
        return album.length;
      }) // JSON
    );
  }

  searchAlbums(word: string): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl + '.json').pipe(
      map((album) => {
        return album.filter((album) =>
          album.title.toLowerCase().includes(word.toLowerCase())
        );
      })
    );
  }

  paginate(page: number, size: number): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl + '.json').pipe(
      map((album) => {
        return album.slice((page - 1) * size, page * size);
      })
    );
  }
}
