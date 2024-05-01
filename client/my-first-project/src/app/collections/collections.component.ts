import { Component } from '@angular/core';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { PaintingServiceService } from '../shared/services/painting-service.service';
import { Painting } from '../shared/model/Painting';
import { CommonModule } from '@angular/common';
import { UserService } from '../shared/services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [
    TopMenuComponent,
    MatCardModule,
    MatGridListModule,
    MatGridTile,
    CommonModule,
    MatButtonModule,
    FooterComponent
  ],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss'
})
export class CollectionsComponent {

  paintings!:Painting[];

  collections!:string[];

  constructor(private router: Router,private userService:UserService,private paintingService: PaintingServiceService) { }


  ngOnInit(){
    this.userService.getAllPainting().subscribe({
      next: (data) => {
        this.paintings = data;
        console.log(this.paintings)
        this.getUniqueCollectionNames();
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  watchpainting(painting: Painting){
    this.paintingService.setSelectedPainting(painting);
    this.router.navigateByUrl('/painting-watcher');
  }

  getUniqueCollectionNames(){
    const uniqueNames: string[] = [];
    this.paintings.forEach(painting => {
      if (painting.col_group && !uniqueNames.includes((painting.artist_name+' - '+painting.col_group))) {
        uniqueNames.push((painting.artist_name+' - '+painting.col_group));
      }
    });
    console.log(uniqueNames);
    this.collections=uniqueNames;
  }
}
