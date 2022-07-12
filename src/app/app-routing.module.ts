import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './page/about-page/about-page.component';
import { AddArticlePageComponent } from './page/add-article-page/add-article.component';
import { ArticlesPageComponent } from './page/articles-page/articles-page.component';
import { ContactPageComponent } from './page/contact-page/contact-page.component';
import { DeleteArticleComponent } from './page/delete-article/delete-article.component';
import { LoginPageComponent } from './page/login-page/login.component';
import { MainPageComponent } from './page/main-page/main-page.component';

const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'sachem', component: AboutPageComponent },
    { path: 'articles', component: ArticlesPageComponent },
    { path: 'contact', component: ContactPageComponent },
    { path: 'add-article', component: AddArticlePageComponent },
    { path: 'delete-article', component: DeleteArticleComponent },
    { path: '**', component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
