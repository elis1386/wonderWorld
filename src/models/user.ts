export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  image: string;
  borrowedBooks: [string]
}
