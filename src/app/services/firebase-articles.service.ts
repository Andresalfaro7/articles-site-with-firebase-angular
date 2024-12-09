import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticlesRegister } from '../models/articles.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseArticlesService {

  private dbUrl = "https://articledb-f9baf-default-rtdb.firebaseio.com/articles";

  constructor(private http: HttpClient) { }

  //Create article
  createArticle(article: ArticlesRegister){
    return this.http.post(`${this.dbUrl}.json`, article);
  }

  //Get alls articles
  getArticles(): Observable<{ [key: string]: ArticlesRegister }>{
    return this.http.get<{[key: string]: ArticlesRegister}>(`${this.dbUrl}.json`)
  }

  // Update appoinment by id
  updateArticle(id: string, article: ArticlesRegister): Observable<any> {
    return this.http.put(`${this.dbUrl}/${id}.json`, article);
  }

  // Delete Article by id
  deleteArticle(id: string): Observable<any> {
    return this.http.delete(`${this.dbUrl}/${id}.json`);
  }

  // get appoinment by id
  getArticleById(id: string): Observable<any> {
    return this.http.get(`${this.dbUrl}/${id}.json`);
  }
}
