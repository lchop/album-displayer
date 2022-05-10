import { Injectable } from '@angular/core';
import { Article, List } from './article.model';
import { Observable, Subject, map, find } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  idToken: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.user$.subscribe((user) => {
      this.idToken = user?.idToken;
      console.log(user);
    });
  }

  sendCurrentNumberPage = new Subject<number>();

  // convention dans l'API ajoutez votre identifant de base de données
  private articlesUrl =
    'https://sachem-fcd12-default-rtdb.europe-west1.firebasedatabase.app/articles';
  private articleListsUrl =
    'https://sachem-fcd12-default-rtdb.europe-west1.firebasedatabase.app/articlelists';

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }

  getArticles(): Observable<Article[]> {
    // return this.http.get<Article[]>(this.articlesUrl + `.json?auth=${this.idToken}`).pipe(
    return this.http.get<Article[]>(this.articlesUrl + `.json`).pipe(
      map((articles) => {
        return articles.sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
        );
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
    return this.http.get<Article[]>(this.articlesUrl + `.json`).pipe(
      map((album) => {
        return album.length;
      }) // JSON
    );
  }

  getLastArticle(): Observable<Article> {
    return this.http.get<Article[]>(this.articlesUrl + `.json`).pipe(
      map((album) => {
        return album.sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
        )[0];
      })
    );
  }

  searchArticles(word: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl + `.json`).pipe(
      map((album) => {
        return album.filter((album) =>
          album.title.toLowerCase().includes(word.toLowerCase())
        );
      })
    );
  }

  paginate(page: number, size: number): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl + `.json`).pipe(
      map((articles) => {
        return articles
          .sort(
            (a, b) =>
              new Date(b.creationDate).getTime() -
              new Date(a.creationDate).getTime()
          )
          .slice((page - 1) * size, page * size);
      })
    );
  }
}
