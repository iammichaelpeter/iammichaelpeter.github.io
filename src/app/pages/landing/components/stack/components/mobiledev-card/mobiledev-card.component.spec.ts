import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobiledevCardComponent } from './mobiledev-card.component';

describe('MobiledevCardComponent', () => {
  let component: MobiledevCardComponent;
  let fixture: ComponentFixture<MobiledevCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobiledevCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobiledevCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
