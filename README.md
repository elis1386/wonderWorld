# WonderWorl Children's Library System - README

Welcome to WonderWorl Children's Library System! This project is designed to provide a comprehensive library system for managing books, user accounts, and administrative tasks. Below, you'll find information on how to set up, deploy, and run the system, along with additional features and prerequisites.

## Table of Contents

1.  [Core Features](https://chat.openai.com/c/9e0c0392-59e5-43fb-8511-7b5d1abe0df2#1-core-features)
2.  [Additional Features](https://chat.openai.com/c/9e0c0392-59e5-43fb-8511-7b5d1abe0df2#2-additional-features)
3.  [Prerequisites](https://chat.openai.com/c/9e0c0392-59e5-43fb-8511-7b5d1abe0df2#prerequisites)
4.  [Deploy](https://chat.openai.com/c/9e0c0392-59e5-43fb-8511-7b5d1abe0df2#deploy)
5.  [Getting Started](https://chat.openai.com/c/9e0c0392-59e5-43fb-8511-7b5d1abe0df2#getting-started)
6.  [Screenshots](https://chat.openai.com/c/9e0c0392-59e5-43fb-8511-7b5d1abe0df2#screenshots)

## 1. Core Features

### Guest Functionalities:

- **Browse Books:**

  - Explore all available books.
  - View book details.
  - Search and sort books.

- **User Account Management:**

  - Borrow books.
  - Check borrowed books.
  - Return books (remove from account).

### User Functionalities:

- **User Management:**
  - Sign up, log in, and log out.
  - Users have no access to the admin panel.

### Admin Functionalities:

- **Product Management:**
  - View all books from the database.
  - Add new books.
  - Update existing books.
  - Delete books.

## 2. Additional Features

- Users can see other books by the same author on the book page.
- Displays all books by a specific author.
- Implemented using Playwright for sign-in, sign-up, and book borrowing.
- Jasmine/Karma used for testing services.

## Prerequisites

- Implement routing and guards to protect certain routes.
- Utilize Angular animations for book borrowing effects.
- Handle errors, alerts, and modal windows for various scenarios.
- Maintain a well-organized directory structure and adhere to Angular best practices.

## Deploy

- Front-end deployed on Firebase Hosting: [[https://wonderworld-2a0e3.firebaseapp.com/](https://wonderworld-2a0e3.firebaseapp.com/)]
- Back-end deployed on Firebase Functions: [[https://api-r3paoizkka-uc.a.run.app/api/v1/books](https://api-r3paoizkka-uc.a.run.app/api/v1/books)]

### Getting Started

To start using the WonderWorl Children's Library System, follow these simple steps:

1.  **Install Frontend Dependencies:**

    ```bash
    npm install

    ```

2.  **Run the front end project:**

    ```bash
    ng serve

    ```

3.  **Run e2e tests:**

    ```bash
    npx playwright test --headed
    ```

    ```bash
    npx cypress open
    npx cypress run --headless
    ```

4.  **Run jasmin/karma:**

    ```bash
    tests ng test
    ```

### Screenshots

![Homepage](src/assets/homepage.png),

![Admin Panel](src/assets/admin.png),

![User Account Management](src/assets/user.png)

```

```
