import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../model/News';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  register(news: News) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('title', news.title);
    body.set('article', news.article);
    body.set('date', String(news.date));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/registerNews', body, {headers: headers});
  }

  getAllNews(){
    return this.http.get<News[]>('http://localhost:5000/app/getAllNews', {withCredentials: true});
  }

  deleteNews(title:String){
    return this.http.delete('http://localhost:5000/app/deleteNews?title=' + title, {withCredentials: true});
  }
}
