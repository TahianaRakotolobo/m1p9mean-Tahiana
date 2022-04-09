import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryassignmentComponent } from './deliveryassignment.component';

describe('DeliveryassignmentComponent', () => {
  let component: DeliveryassignmentComponent;
  let fixture: ComponentFixture<DeliveryassignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryassignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
