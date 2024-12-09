import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UpdateArticleComponent } from './views/update-article/update-article.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'actualizar-articulo/:id', component:UpdateArticleComponent},
];
