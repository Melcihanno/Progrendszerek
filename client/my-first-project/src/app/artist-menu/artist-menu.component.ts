import { Component } from '@angular/core';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule, Location } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Painting } from '../shared/model/Painting';
import { UserService } from '../shared/services/user.service';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-artist-menu',
  standalone: true,
  imports: [
    TopMenuComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule
  ],
  templateUrl: './artist-menu.component.html',
  styleUrl: './artist-menu.component.scss'
})
export class ArtistMenuComponent {
  paintingForm!: FormGroup;
  paintings!: Painting[];
  columns = ['name','description','artist_name','year','sold','price','source'];

  constructor(
    private router: Router,
    private authService: AuthService,
    private location: Location,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.paintingForm = this.formBuilder.group({
      name: ['',Validators.required],
      description:[''],
      artist_name: ['',Validators.required],
      year: ['',Validators.required],
      sold: ['',Validators.required],
      price: ['',Validators.required],
      source: ['',Validators.required],
      col_group: ['',Validators.required]
    });
    this.refreshPaintings();
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

  onSubmit(){
    console.log(this.paintingForm.value)
    if (this.paintingForm.valid) {
      console.log('Form data:', this.paintingForm.value);
      this.authService.uploadPainting(this.paintingForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.refreshPaintings();
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  goBack() {
    this.location.back();
  }

  deletePainting(painting_name: string){
    console.log(painting_name)
    this.userService.deletePainting(painting_name).subscribe({
      next: (data) => {
        console.log(data);
        this.refreshPaintings();
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  refreshPaintings() {
    console.log(this.authService.email);
    this.userService.getMyPainting(this.authService.email).subscribe({
      next: (data) => {
        this.paintings = data;
        // console.log(this.paintings);
      }, error: (err) => {
        console.log(err);
      }
    });
  }
}
