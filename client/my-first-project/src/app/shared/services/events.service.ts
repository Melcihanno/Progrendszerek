import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from '../model/Events';
import { EventManager } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  register(event: Events) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('name', event.name);
    body.set('description', event.description);
    body.set('artist_name', event.artist_name);
    body.set('date', String(event.date));
    body.set('max_attendees', String(event.max_attendees));
    body.set('img_source', event.img_source);
    body.set('price',String(event.price));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/registerEvent', body, {headers: headers});
  }

  getAllEvents(){
    return this.http.get<Events[]>('http://localhost:5000/app/getAllEvent', {withCredentials: true});
  }

  deleteEvent(name:String){
    return this.http.delete('http://localhost:5000/app/deleteEvent?name=' + name, {withCredentials: true});
  }

  getMyEvents(artist_name: String){
    return this.http.get<Events[]>('http://localhost:5000/app/getMyEvents?artist_name='+artist_name, {withCredentials: true});
  }

  signMeUp(eventname:string,attendees: string,ferohelyek:number){
    const body = new URLSearchParams();
    body.set('name', eventname);
    body.set('attendees',attendees);
    body.set('ferohelyek',String(ferohelyek))
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post('http://localhost:5000/app/EventUpdateUser', body, {headers: headers})
  }

}

