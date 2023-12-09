import { Author } from './author';

export interface Book {
  _id: string;
  isbn: string;
  title: string;
  publisher: string;
  image: string;
  publishedDate: string;
  status: 'available' | 'borrowed';
  borrowerId?: string;
  borrowDate?: string;
  returnDate?: string;
  authors: Author[];
  genres?: string[];
}

export interface NewBook {
  isbn: string;
  image: string;
  title: string;
  publisher: string;
  publishedDate: string;
}
