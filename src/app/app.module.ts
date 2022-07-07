import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { MainPageComponent } from './page/main-page/main-page.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './page/login/login.component';
import { PaginateComponent } from './components/paginate/paginate.component';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { FooterComponent } from './partials/footer/footer.component';
import { AboutPageComponent } from './page/about-page/about-page.component';
import { ArticlesPageComponent } from './page/articles-page/articles-page.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ContactPageComponent } from './page/contact-page/contact-page.component';
import { AddArticlePageComponent } from './page/add-article-page/add-article.component';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DeleteArticleComponent } from './page/delete-article/delete-article.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ContactService } from './page/contact-page/contact.service';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { SuccessAddArticlePageComponent } from './page/success-add-article-page/success-add-article-page.component';
import { SearchArticlesComponent } from './components/search-articles/search-articles.component';


// const firebaseConfig = {
//     apiKey: "AIzaSyA_qMTzXvNHhR4FQlPuazr5NC9Cmo4gwlw",
//     authDomain: "sachem-fcd12.firebaseapp.com",
//     databaseURL: "https://sachem-fcd12-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "sachem-fcd12",
//     storageBucket: "sachem-fcd12.appspot.com",
//     messagingSenderId: "44609888106",
//     appId: "1:44609888106:web:390916816d50e3e5cd0f13",
//     measurementId: "G-QVNQXHPHDS"
// };

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    MainPageComponent,
    LoginComponent,
    PaginateComponent,
    NavBarComponent,
    FooterComponent,
    AboutPageComponent,
    ArticlesPageComponent,
    CarouselComponent,
    ContactPageComponent,
    AddArticlePageComponent,
    DeleteArticleComponent,
    UploadFileComponent,
    ArticleCardComponent,
    AddArticleComponent,
    SuccessAddArticlePageComponent,
    SearchArticlesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [AuthService, DatePipe, ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
