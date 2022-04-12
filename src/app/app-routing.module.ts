import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescriptionAlbumPageComponent } from './description-album-page/description-album-page.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
    { path: 'main', component: MainPageComponent },
    { path: 'description/:id', component: DescriptionAlbumPageComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: MainPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
