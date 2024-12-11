import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicdCardComponent } from './cicd-card.component';

describe('CicdCardComponent', () => {
  let component: CicdCardComponent;
  let fixture: ComponentFixture<CicdCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CicdCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CicdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
