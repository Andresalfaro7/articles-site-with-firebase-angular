import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticlesRegister } from '../../models/articles.model';
import { FirebaseArticlesService } from '../../services/firebase-articles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-article',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-article.component.html',
  styleUrl: './update-article.component.css'
})
export class UpdateArticleComponent {
  inputTitle:string="";
  inputSubtitle:string="";
  inputArticle:string="";
  id:string="";
  articles: ArticlesRegister[];
  selectedArticle: ArticlesRegister | null = null;
  
  constructor(private firebaseArticleService: FirebaseArticlesService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getAppointmentById(this.id);
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
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

  // Update appointment by id
  updateArticle() :void{
    let article = new ArticlesRegister(this.id, this.inputTitle, this.inputSubtitle, this.inputArticle);
    this.firebaseArticleService.updateArticle(this.id, article).subscribe({
      next: () => {
        console.log('Árticulo actualizado exitosamente');
        this.loadArticles();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al actualizar árticulo:', error);
      }
    });
  }

  // Get appointment by id
  getAppointmentById(id: string): void {
    this.firebaseArticleService.getArticleById(id).subscribe({
      next: (data) => {
        this.selectedArticle = { id, ...data };
        if(this.selectedArticle){
          console.log('Cita obtenida:', this.selectedArticle);
          this.inputTitle = this.selectedArticle.title;
          this.inputSubtitle = this.selectedArticle.subtitle;
          this.inputArticle = this.selectedArticle.article;
        }
      },
      error: (error) => {
        console.error('Error al obtener el árticulo:', error);
      }
    });
  }
}
