import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingWatcherComponent } from './painting-watcher.component';

describe('PaintingWatcherComponent', () => {
  let component: PaintingWatcherComponent;
  let fixture: ComponentFixture<PaintingWatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintingWatcherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaintingWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
