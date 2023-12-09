import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BookService } from 'src/app/services/book.service';
import { NewBook } from 'src/models/book';

@Component({
  selector: 'app-create-book-modal',
  templateUrl: './create-book-modal.component.html',
  styleUrls: ['./create-book-modal.component.css'],
})
export class CreateBookModalComponent {
  @Output() createBook = new EventEmitter<NewBook>();
  bookForm!: FormGroup<any>;

  constructor(private fb: FormBuilder, private bookService: BookService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      isbn: ['', Validators.required],
      title: ['', Validators.required],
      image: ['', Validators.required],
      publisher: ['', Validators.required],
      publishedDate: ['', Validators.required],
    });
  }

  submitForm(): void {
    if (this.bookForm.valid) {
      const newBookData = this.bookForm.value;
      this.bookService.createBook(newBookData).subscribe(() => {
        this.bookForm.reset();
      });
    }
  }
}
