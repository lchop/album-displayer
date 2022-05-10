import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormsModule } from '@angular/forms';
import { DescriptionArticlePageComponent } from './description-article-page/description-article-page.component';
import { LoginComponent } from './login/login.component';
import { PaginateComponent } from './paginate/paginate.component';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ContactPageComponent } from './contact-page/contact-page.component';


const firebaseConfig = {
    apiKey: "AIzaSyA_qMTzXvNHhR4FQlPuazr5NC9Cmo4gwlw",
    authDomain: "sachem-fcd12.firebaseapp.com",
    databaseURL: "https://sachem-fcd12-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sachem-fcd12",
    storageBucket: "sachem-fcd12.appspot.com",
    messagingSenderId: "44609888106",
    appId: "1:44609888106:web:390916816d50e3e5cd0f13",
    measurementId: "G-QVNQXHPHDS"
};

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleDetailsComponent,
    MainPageComponent,
    DescriptionArticlePageComponent,
    LoginComponent,
    PaginateComponent,
    NavBarComponent,
    FooterComponent,
    AboutPageComponent,
    ArticlesPageComponent,
    CarouselComponent,
    ContactPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
