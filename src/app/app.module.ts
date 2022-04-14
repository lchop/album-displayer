import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormsModule } from '@angular/forms';
import { DescriptionAlbumPageComponent } from './description-album-page/description-album-page.component';
import { LoginComponent } from './login/login.component';
import { PaginateComponent } from './paginate/paginate.component';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AuthServiceService } from './auth-service.service';


const firebaseConfig = {
  apiKey: "AIzaSyBp8QDpmJEea4vC13cOekVZEHjQb9JzBsk",
  authDomain: "t20-label.firebaseapp.com",
  databaseURL: "https://t20-label-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "t20-label",
  storageBucket: "t20-label.appspot.com",
  messagingSenderId: "415399098209",
  appId: "1:415399098209:web:62af2bca670bb6c8727720",
  measurementId: "G-P333CJDLTY"
};

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    MainPageComponent,
    DescriptionAlbumPageComponent,
    LoginComponent,
    PaginateComponent,
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
  providers: [AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
