import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { CommonModule, Location } from '@angular/common';
import { PaintingServiceService } from '../shared/services/painting-service.service';
import { Painting } from '../shared/model/Painting';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painting-watcher',
  standalone: true,
  imports: [TopMenuComponent,MatButtonModule,CommonModule],
  templateUrl: './painting-watcher.component.html',
  styleUrl: './painting-watcher.component.scss'
})
export class PaintingWatcherComponent{

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
  userbasket:string='';
  user_state:number=0;

  constructor(
    private location:Location,
    private PaintingService: PaintingServiceService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router){}

  ngOnInit(){
    this.selected_painting=this.PaintingService.getSelectedPainting();

    this.checkArtist();
  }

  checkArtist(){
    this.authService.userIsArtist().subscribe((result: User)=>{
      if(result){
        console.log(result);
        let user:User = result;
        this.userbasket = user.basket || '';
        if(user.isartist==='True'){
          this.user_state=1;
        }
        else{
          this.user_state=2;
        }
      }
    });
  }



  goBack() {
    this.location.back();
  }

  UpdateBasket(painting_name: string){
    const new_basket=this.userbasket+','+painting_name;
    const user_email=this.authService.email;
    this.userService.UpdateBasket(new_basket,user_email).subscribe({
      next: (data) => {
        console.log(data);
      }, error: (err) => {
        console.log(err);
      }
    });
    this.checkArtist();
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}
