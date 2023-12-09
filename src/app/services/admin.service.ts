import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/models/book';
import { BookService } from './book.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService implements OnInit {
  books?: Book[];
  baseUrl: string;

  constructor(
    private configService: ConfigService,
  ) {
    this.baseUrl = this.configService.base_url;
  }

  ngOnInit() {}
}
