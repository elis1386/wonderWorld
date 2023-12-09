import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArriveComponent } from './new-arrive.component';

describe('NewArriveComponent', () => {
  let component: NewArriveComponent;
  let fixture: ComponentFixture<NewArriveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewArriveComponent]
    });
    fixture = TestBed.createComponent(NewArriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
