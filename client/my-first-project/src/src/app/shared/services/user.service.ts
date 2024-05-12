import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Painting } from '../model/Painting';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>('http://localhost:5000/app/getAllUsers', {withCredentials: true});
  }

  delete(id: string) {
    return this.http.delete('http://localhost:5000/app/deleteUser?id=' + id, {withCredentials: true});
  }

  getAllPainting(){
    return this.http.get<Painting[]>('http://localhost:5000/app/getAllPainting', {withCredentials: true});
  }

  getMyPainting(email: String){
    return this.http.get<Painting[]>('http://localhost:5000/app/getMyPainting?email='+email, {withCredentials: true});
  }

  deletePainting(name: string) {
    return this.http.delete('http://localhost:5000/app/deletePainting?name=' + name, {withCredentials: true});
  }

  UpdateBasket(basket: string,email:string){
    const body = new URLSearchParams();
    body.set('basket', basket);
    body.set('email',email);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post('http://localhost:5000/app/UpdateBasket', body, {headers: headers})
  }
}
