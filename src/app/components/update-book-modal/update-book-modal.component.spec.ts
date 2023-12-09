import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookModalComponent } from './update-book-modal.component';

describe('UpdateBookModalComponent', () => {
  let component: UpdateBookModalComponent;
  let fixture: ComponentFixture<UpdateBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBookModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
