import { Component } from '@angular/core';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TopMenuComponent,FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
