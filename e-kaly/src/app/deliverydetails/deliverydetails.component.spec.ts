import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverydetailsComponent } from './deliverydetails.component';

describe('DeliverydetailsComponent', () => {
  let component: DeliverydetailsComponent;
  let fixture: ComponentFixture<DeliverydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverydetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
