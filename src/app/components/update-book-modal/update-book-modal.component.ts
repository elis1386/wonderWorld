import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Book } from 'src/models/book';

@Component({
  selector: 'app-update-book-modal',
  templateUrl: './update-book-modal.component.html',
  styleUrls: ['./update-book-modal.component.css'],
})
export class UpdateBookModalComponent implements OnInit, OnChanges {
  @Input() selectedBook: Book | null = null;
  @Output() updateBook = new EventEmitter<Book>();

  updateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedBook && this.selectedBook) {
      this.initForm();
    }
  }

  initForm(): void {
    this.updateForm = this.fb.group({
      isbn: [this.selectedBook?.isbn || '', Validators.required],
      title: [this.selectedBook?.title || '', Validators.required],
      image: [this.selectedBook?.image || '', Validators.required],
      publisher: [this.selectedBook?.publisher || '', Validators.required],
      publishedDate: [this.selectedBook?.publishedDate.slice(0,10) || '', Validators.required],
      _id: [this.selectedBook?._id || '', Validators.required],
      status: [this.selectedBook?.status || ''],
    });
  }

  submitForm(): void {
    if (this.updateForm && this.updateForm.valid) {
      this.updateBook.emit(this.updateForm.value);
      this.updateForm.reset();
    }
  }
}
