import { Injectable } from '@angular/core';
import { Article, List } from './article.model';
import { Observable, Subject, map, find } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  idToken: string;

  constructor(private auth: AuthService, private db: AngularFireDatabase) {
    this.auth.user$.subscribe((user) => {
      this.idToken = user?.idToken;
    });
  }

  sendCurrentNumberPage = new Subject<number>();

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }

  getArticles(): Observable<Article[]> {
    // return this.http.get<Article[]>(this.articlesUrl + `.json?auth=${this.idToken}`).pipe(
    return this.db.list<Article>('articles').valueChanges().pipe(
      map((articles) => {
        return articles.sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
        );
      })
    );
  }

  // getArticle(id: string): Observable<Article> {
  //   return this.db.object<Article>(`articles/${id}`).valueChanges().pipe(
  //     map((album) => {
  //       return album;
  //     }) // JSON
  //   );
  // }

  getCountArticles(): Observable<number> {
    return this.db.list<Article>('articles').valueChanges().pipe(
      map((album) => {
        return album.length;
      }) // JSON
    );
  }

  getLastArticle(): Observable<Article> {
    return this.db.list<Article>('articles').valueChanges().pipe(
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
    return this.db.list<Article>('articles').valueChanges().pipe(
      map((album) => {
        return album.filter((album) =>
          album.title.toLowerCase().includes(word.toLowerCase())
        );
      })
    );
  }

  paginate(page: number, size: number): Observable<Article[]> {
    return this.db.list<Article>('articles').valueChanges().pipe(
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
