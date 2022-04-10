import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsrestoComponent } from './benefitsresto.component';

describe('BenefitsrestoComponent', () => {
  let component: BenefitsrestoComponent;
  let fixture: ComponentFixture<BenefitsrestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsrestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsrestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
