import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { DescriptionArticlePageComponent } from './description-article-page/description-article-page.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
    { path: 'main', component: MainPageComponent },
    { path: 'description/:id', component: DescriptionArticlePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sachem', component: AboutPageComponent },
    { path: 'articles', component: ArticlesPageComponent },
    { path: '**', component: MainPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
