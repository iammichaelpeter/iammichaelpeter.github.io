import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaasCardComponent } from './baas-card.component';

describe('BaasCardComponent', () => {
  let component: BaasCardComponent;
  let fixture: ComponentFixture<BaasCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaasCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
