import { Component } from '@angular/core';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/User';
import { Events } from '../shared/model/Events';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventsService } from '../shared/services/events.service';
import { Route, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    TopMenuComponent,
    MatCardModule,
    MatGridListModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

  user_is_artist=0;
  user_artist_name='';
  myevents!:Events[];
  publicevents!:Events[];
  eventForm!: FormGroup;
  username='';

  constructor(
    private authService: AuthService,
    private location: Location,
    private formBuilder: FormBuilder,
    private eventService: EventsService,
    private router: Router){}

  ngOnInit(){
    this.checkArtist();
    this.refreshEvents();
    // this.refreshMyEvents();
  }

  checkArtist():void{
    console.log('checkartist called');
    this.authService.userIsArtist().subscribe((result: User)=>{
      if(result){
        console.log(result);
        let user:User = result;
        if(user.isartist==='True'){
          console.log(user.name);
          this.user_artist_name=user.name;
          this.user_is_artist=1;
          this.eventForm = this.formBuilder.group({
            name: ['',Validators.required],
            description:['',Validators.required],
            artist_name: [this.user_artist_name],
            date:['',Validators.required],
            max_attendees:['',Validators.required],
            img_source:['',Validators.required],
            price:['',Validators.required]
          });
          this.refreshMyEvents();
        }
        else{
          this.user_is_artist=2;
          this.username=user.name;
          this.refreshEvents();
        }
      }
    });
  }

  goBack() {
    this.location.back();
  }

  signmeup(eventname: string,userslist: string,ferohelyek: number){
    const attendees=userslist+','+this.username
    const ferohely=ferohelyek-1;
    this.eventService.signMeUp(eventname,attendees,ferohely).subscribe({
      next: (data) => {
        console.log(data);
        // this.refreshMyEvents();
      }, error: (err) => {
        console.log(err);
      }
    });
    this.refreshEvents();
  }

  signmeoff(eventname: string,userslist: string,ferohelyek: number){
    const attendees = userslist.split(',').filter(user => user.trim() !== this.username).join(',');
    const ferohely=ferohelyek+1;
    this.eventService.signMeUp(eventname,attendees,ferohely).subscribe({
      next: (data) => {
        console.log(data);
        // this.refreshMyEvents();
      }, error: (err) => {
        console.log(err);
      }
    });
    this.refreshEvents();
  }

  onSubmit(){
    console.log('Submitted')
    if (this.eventForm.valid) {
      console.log('Form data:', this.eventForm.value);
      this.eventService.register(this.eventForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.refreshMyEvents();
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  refreshEvents() {
    console.log(this.authService.email);
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.publicevents = data;
        console.log(this.publicevents);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  refreshMyEvents() {
    console.log(this.authService.email);
    this.eventService.getMyEvents(this.user_artist_name).subscribe({
      next: (data) => {
        this.myevents = data;
        console.log(this.publicevents);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  deleteEvent(name: String){
    console.log(name)
    this.eventService.deleteEvent(name).subscribe({
      next: (data) => {
        console.log(data);
        this.refreshEvents();
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

}
