import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { DeleteArticleComponent } from './delete-article/delete-article.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
    { path: 'main', component: MainPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sachem', component: AboutPageComponent },
    { path: 'articles', component: ArticlesPageComponent },
    { path: 'contact', component: ContactPageComponent },
    { path: 'add-article', component: AddArticleComponent },
    { path: 'delete-article', component: DeleteArticleComponent },
    { path: '**', component: MainPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
