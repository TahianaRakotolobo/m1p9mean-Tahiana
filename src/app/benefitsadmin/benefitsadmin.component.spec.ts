import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsadminComponent } from './benefitsadmin.component';

describe('BenefitsadminComponent', () => {
  let component: BenefitsadminComponent;
  let fixture: ComponentFixture<BenefitsadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
