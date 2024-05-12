import { Component } from '@angular/core';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/model/User';
import { NewsService } from '../shared/services/news.service';
import { News } from '../shared/model/News';
import { CommonModule, Location } from '@angular/common';


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [TopMenuComponent,FooterComponent,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  user_is_artist=0;
  publicNews!:News[];
  newsForm!: FormGroup;


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private location: Location,
    private router: Router){}

  ngOnInit(){
    this.refreshNews();
    this.newsForm = this.formBuilder.group({
      title: ['',Validators.required],
      article:['',Validators.required],
      date:['',Validators.required],
    });
    this.checkArtist();
  }

  checkArtist():void{
    console.log('checkartist called');
    this.authService.userIsArtist().subscribe((result: User)=>{
      if(result){
        console.log(result);
        let user:User = result;
        if(user.isartist==='True'){
          console.log(user.name);
          this.user_is_artist=1;
          this.refreshNews();
        }
        else{
          this.user_is_artist=2;
          this.refreshNews();
        }
      }
    });
  }


  onSubmit(){
    console.log('Submitted')
    if (this.newsForm.valid) {
      console.log('Form data:', this.newsForm.value);
      this.newsService.register(this.newsForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.refreshNews();
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  refreshNews() {
    this.newsService.getAllNews().subscribe({
      next: (data) => {
        this.publicNews = data;
        console.log(this.publicNews);
      }, error: (err) => {
        console.log(err);
      }
    });
  }



  deleteNews(title: String){
    console.log(title)
    this.newsService.deleteNews(title).subscribe({
      next: (data) => {
        console.log(data);
        this.refreshNews();
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

  goBack() {
    this.location.back();
  }
}
