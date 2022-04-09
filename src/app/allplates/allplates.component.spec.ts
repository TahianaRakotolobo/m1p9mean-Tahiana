import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllplatesComponent } from './allplates.component';

describe('AllplatesComponent', () => {
  let component: AllplatesComponent;
  let fixture: ComponentFixture<AllplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
