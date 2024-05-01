import { Component } from '@angular/core';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/User';
import { MatCardModule } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { Painting } from '../shared/model/Painting';
import { UserService } from '../shared/services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [TopMenuComponent,
    MatCardModule,
    MatGridList,
    CommonModule,
    MatGridTile,
    MatButtonModule,
  FooterComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    ){}

  userbasket:string=''
  paintings!:Painting[];

  ngOnInit(){
    this.load_basket();
  }

  load_basket(): void {
    this.userService.getAllPainting().subscribe({
        next: (data) => {
            // Ellenőrizzük a felhasználó kosarában lévő festményeket
            this.authService.userIsArtist().subscribe((result: User) => {
                if (result) {
                    console.log(result);
                    let user: User = result;
                    this.userbasket = user.basket || '';
                    // Szűrjük a festményeket a userbasket alapján
                    this.paintings = data;
                    this.paintings = this.paintings.filter(painting => this.userbasket.includes(painting.name));
                }
            });
        }, 
        error: (err) => {
            console.log(err);
        }
    });
  }

  deleteFromBasket(painting_name:string){
    const new_basket = this.userbasket.split(',').filter(item => item.trim() !== painting_name).join(',');
    const user_email=this.authService.email;
    this.userService.UpdateBasket(new_basket,user_email).subscribe({
      next: (data) => {
        console.log(data);
      }, error: (err) => {
        console.log(err);
      }
    });
    this.load_basket();
  }

  sendOrder(){
    const new_basket = '';
    const user_email=this.authService.email;
    this.userService.UpdateBasket(new_basket,user_email).subscribe({
      next: (data) => {
        console.log(data);
      }, error: (err) => {
        console.log(err);
      }
    });
    this.load_basket();
  }
}
