import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule} from '@angular/material/button';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { UserService } from '../shared/services/user.service';
import { Painting } from '../shared/model/Painting';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { PaintingWatcherComponent } from '../painting-watcher/painting-watcher.component';
import { PaintingServiceService } from '../shared/services/painting-service.service';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    TopMenuComponent,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    CommonModule,
    PaintingWatcherComponent,
  FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  paintings!: Painting[];

  constructor(private router: Router,private userService: UserService,private paintingService: PaintingServiceService) { }

  ngOnInit(){
    this.userService.getAllPainting().subscribe({
      next: (data) => {
        this.paintings = data;
        // console.log(this.paintings);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

  watchpainting(painting: Painting){
    this.paintingService.setSelectedPainting(painting);
    this.router.navigateByUrl('/painting-watcher');
  }
}
