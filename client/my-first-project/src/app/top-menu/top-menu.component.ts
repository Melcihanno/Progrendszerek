import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../shared/model/User';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {
  authenticated=false;
  user_is_artist:number=0;

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe({
      next: (result: boolean) => {
          if (result) {
              this.checkArtist();
              this.authenticated = result;
          }
      },
      error: (err) => {
          // console.error('Error occurred during authentication check:', err);
          // Tölts be valamilyen alapértelmezett értéket vagy kezeld a hibát a saját logikádnak megfelelően
      }
  });
  }

  checkArtist():void{
    this.authService.userIsArtist().subscribe((result: User)=>{
      if(result){
        // console.log(result);
        let user:User = result;
        if(user.isartist==='True'){
          this.user_is_artist=1;
        }
        else{
          this.user_is_artist=2;
        }
      }
    });
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/home-page');
        this.authenticated=false;
      }, error: (err) => {
        console.log(err);
      }
    });
  }
}
