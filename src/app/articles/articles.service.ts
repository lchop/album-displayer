import { Injectable } from '@angular/core';
import { Article, List } from './article.model';
import { Observable, Subject, map, find } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  sendCurrentNumberPage = new Subject<number>();

  // convention dans l'API ajoutez votre identifant de base de données
  private articlesUrl =
    'https://t20-label-default-rtdb.europe-west1.firebasedatabase.app/albums';
  private articleListsUrl =
    'https://t20-label-default-rtdb.europe-west1.firebasedatabase.app/albumLists';

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl + '.json').pipe(
      map((albums) => {
        return albums.sort((a, b) => {
          return b.duration - a.duration;
        });
      })
    );
  }

  getArticle(id: string): Observable<Article> {
    return this.http.get<Article>(this.articlesUrl + `/${id}.json`).pipe(
      map((album) => {
        return album;
      }) // JSON
    );
  }

  getArticleList(id: string): Observable<string[] | undefined> {
    return this.http.get<List>(this.articleListsUrl + `/${id}.json`).pipe(
      map((album) => {
        return album.list;
      }) // JSON
    );
  }

  getCountArticles(): Observable<number> {
    return this.http.get<Article[]>(this.articlesUrl + '.json').pipe(
      map((album) => {
        return album.length;
      }) // JSON
    );
  }

  searchArticles(word: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl + '.json').pipe(
      map((album) => {
        return album.filter((album) =>
          album.title.toLowerCase().includes(word.toLowerCase())
        );
      })
    );
  }

  paginate(page: number, size: number): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl + '.json').pipe(
      map((album) => {
        return album.slice((page - 1) * size, page * size);
      })
    );
  }
}
