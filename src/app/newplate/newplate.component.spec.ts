import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewplateComponent } from './newplate.component';

describe('NewplateComponent', () => {
  let component: NewplateComponent;
  let fixture: ComponentFixture<NewplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
