import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Painting } from '../model/Painting';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email='';

  constructor(private http: HttpClient) { }

  // login
  login(email: string, password: string) {
    // HTTP POST request
    this.email=email;
    console.log(email);
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/login', body, {headers: headers, withCredentials: true});
  }

  register(user: User) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('name', user.name);
    body.set('address', user.address);
    body.set('nickname', user.nickname);
    body.set('password', user.password);
    body.set('isartist', user.isartist);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/register', body, {headers: headers});
  }

  uploadPainting(painting: Painting){
    const body = new URLSearchParams();
    body.set('name', painting.name);
    body.set('artist_name', painting.artist_name);
    body.set('description', painting.description);
    body.set('price', String(painting.price));
    body.set('year', String(painting.year));
    body.set('sold', painting.sold ? 'true' : 'false');
    body.set('source', painting.source);
    body.set('email',this.email);
    body.set('col_group',painting.col_group);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/uploadPainting', body, {headers: headers});
  }

  logout() {
    return this.http.post('http://localhost:5000/app/logout', {}, {withCredentials: true, responseType: 'text'});
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:5000/app/checkAuth', {withCredentials: true});
  }

  userIsArtist(){
    return this.http.get<User>('http://localhost:5000/app/userIsArtist?email='+this.email, {withCredentials: true});
  }
}
