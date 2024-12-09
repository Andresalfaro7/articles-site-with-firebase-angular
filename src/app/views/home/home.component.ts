import { Component } from '@angular/core';
import { ArticlesRegister } from '../../models/articles.model';
import { FirebaseArticlesService } from '../../services/firebase-articles.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  inputTitle:string="";
  inputSubtitle:string="";
  inputArticle:string="";
  id:string="";
  articles: ArticlesRegister[];

  constructor(private firebaseArticleService: FirebaseArticlesService, private router: Router){ }

  ngOnInit(): void{
    this.loadArticles();
  }

  loadArticles(): void{
    this.firebaseArticleService.getArticles().subscribe({
      next: (data) =>{
        if(data != null || data != undefined){
          this.articles = Object.keys(data || {}).map((key) =>{
            const  articleData = { ...data[key] };
            return new ArticlesRegister(
              key, 
              articleData.title,
              articleData.subtitle,
              articleData.article
            );
          })
        }
        console.log(data);
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

  saveArticle(): void{
    let article = new ArticlesRegister(this.id, this.inputTitle, this.inputSubtitle, this.inputArticle);
    this.firebaseArticleService.createArticle(article).subscribe({
      next: () =>{
        this.inputTitle = "";
        this.inputSubtitle ="";
        this.inputArticle="";
        this.loadArticles();
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

  deleteArticle(id: string): void {
    const result = window.confirm('¿Estás seguro de que quieres continuar?');
    if(result){
      this.firebaseArticleService.deleteArticle(id).subscribe({
        next: () => {
          console.log('Áticulo eliminado exitosamente');
          this.loadArticles();
        },
        error: (error) => {
          console.error('Error al eliminar el árticulo:', error);
        }
      });
    } else {
      console.log('El usuario canceló la acción.');
    }
  }
}
