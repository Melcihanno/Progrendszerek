import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Painting } from '../model/Painting';

@Injectable({
  providedIn: 'root'
})
export class PaintingServiceService {

  selected_painting:Painting= {
    name: '',
    description: '',
    artist_name: '',
    year: 0,
    sold: false,
    price: 0,
    source: '',
    email: '',
    col_group: ''
  };
  constructor(private http: HttpClient) { }

  setSelectedPainting(painting: Painting){
    this.selected_painting=painting;
  }

  getSelectedPainting(){
    return this.selected_painting;
  }
}
