import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylingCardComponent } from './styling-card.component';

describe('StylingCardComponent', () => {
  let component: StylingCardComponent;
  let fixture: ComponentFixture<StylingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
