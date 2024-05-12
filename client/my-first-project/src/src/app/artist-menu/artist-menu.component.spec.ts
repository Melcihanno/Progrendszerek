import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistMenuComponent } from './artist-menu.component';

describe('ArtistMenuComponent', () => {
  let component: ArtistMenuComponent;
  let fixture: ComponentFixture<ArtistMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
