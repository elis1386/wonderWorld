/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("User Registration and Flow", () => {
  const randomPassword = faker.internet.password();
  const randomEmail = faker.internet.email();
  const randomName = faker.internet.userName();
  const randomSurname = faker.person.lastName();
  const randomUrl = faker.internet.url();

  it("should sign up, sign in, logout and interact with book", () => {
    cy.visit("https://wonderworld-2a0e3.web.app/");

    // Click to Sign Up
    cy.get(".sign-up").click();

    //Fillout the registration form
    cy.get('[data-cy="input-signup-first-name"]').type(randomName); // email
    cy.get('[data-cy="input-signup-last-name"]').type(randomSurname); // password
    cy.get('[data-cy="input-signup-email"]').type(randomEmail);
    cy.get('[data-cy="input-signup-password"]').type(randomPassword);
    cy.get('[data-cy="input-signup-image"]').type(randomUrl);

    cy.get('[data-cy="submit-signup"]').click();
    cy.url().should("include", "/user");

    // logout
    cy.get(".d-block").click();
    cy.get(":nth-child(3) > .dropdown-item").click();
    cy.url().should("include", "/");
  });
});
describe("User Sign in", () => {
  const userPassword = "Alexia1234";
  const userEmail = "alexia@aalto.com";

  it("sign in, logout and interact with book", () => {
    cy.visit("https://wonderworld-2a0e3.web.app/");

    // Click to Sign Up
    cy.get(".login").click();

    //Fillout the registration form
    cy.get('[data-cy="input-login-email"]').type(userEmail); // email
    cy.get('[data-cy="input-login-password"]').type(userPassword); // password

    cy.get('[data-cy="submit-login"]').click();
    cy.url().should("include", "/user");

    cy.wait(2000);

    // logout
    cy.get(".d-block").click();
    cy.get(":nth-child(3) > .dropdown-item").click();
    cy.url().should("include", "/");
  });
});
describe("Borrow book", () => {
  const userPassword = "Alexia1234";
  const userEmail = "alexia@aalto.com";

  it.only("sign in and borrow book", () => {
    cy.visit("https://wonderworld-2a0e3.web.app/");

    // Click to Sign Up
    cy.get(".login").click();

    //Fillout the registration form
    cy.get('[data-cy="input-login-email"]').type(userEmail); // email
    cy.get('[data-cy="input-login-password"]').type(userPassword); // password

    cy.get('[data-cy="submit-login"]').click();
    cy.url().should("include", "/user");

    cy.get(".logo").click();
    cy.wait(2000);
    cy.get("app-new-arrive.ng-tns-c11-2 > .container > .card-box > :nth-child(1) > .info > .book-name").click();
    cy.get('[data-cy="button-borrow-book"]').click();
    cy.get('[data-cy="button-borrow-book"]').should("have.class", "disabled");
  });
});
describe("Return book", () => {
  const userPassword = "Alexia1234";
  const userEmail = "alexia@aalto.com";

  it("sign in and borrow book", () => {
    cy.visit("https://wonderworld-2a0e3.web.app/");

    // Click to Sign Up
    cy.get(".login").click();

    //Fillout the registration form
    cy.get(":nth-child(2) > .form-control").type(userEmail); // email
    cy.get(":nth-child(3) > .form-control").type(userPassword); // password

    cy.get(".w-100").click();
    cy.url().should("include", "/user");
    cy.get(".btn").contains("Return Book").click();
    cy.contains("You have no books yet. Please go to the main page and add books.").should("be.visible");
  });
});
