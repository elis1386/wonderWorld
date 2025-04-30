/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

const userEmail = "alexia@aalto.com";
const userPassword = "Alexia1234";

const randomPassword = faker.internet.password();
const randomEmail = faker.internet.email();
const randomName = faker.internet.userName();
const randomSurname = faker.person.lastName();
const randomUrl = faker.internet.url();

describe("User Registration", () => {
  it("should sign up and logout", () => {
    cy.visit("https://wonderworld-2a0e3.web.app/");
    cy.get(".sign-up").click();

    cy.get('[data-cy="input-signup-first-name"]').type(randomName);
    cy.get('[data-cy="input-signup-last-name"]').type(randomSurname);
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

  it("should not sign up", () => {
    cy.visit("https://wonderworld-2a0e3.web.app/");
    cy.get(".sign-up").click();

    cy.get('[data-cy="input-signup-first-name"]').type(randomName);
    cy.get('[data-cy="input-signup-last-name"]').type(randomSurname);
    cy.get('[data-cy="input-signup-email"]').type(randomSurname);
    cy.get('[data-cy="input-signup-password"]').type(randomPassword);
    cy.get('[data-cy="input-signup-image"]').type(randomUrl);

    cy.get('[data-cy="submit-signup"]').click();
    cy.contains("Email is required.").should("be.visible");
  });
});

describe("User Sign in", () => {
  context("Positive case", () => {
    beforeEach(() => {
      cy.login(userEmail, userPassword);
    });

    it("should login and logout", () => {
      cy.url().should("include", "/user");
      cy.get('[data-cy="user-menu-button"]').click();
      cy.get('[data-cy="logout-button"]').click();
      cy.url().should("include", "/");
    });
  });

  context("Negative cases", () => {
    it("should show error when email is missing", () => {
      cy.visit("https://wonderworld-2a0e3.web.app/");
      cy.get(".login").click();
      cy.get('[data-cy="input-login-email"]').clear();
      cy.get('[data-cy="input-login-password"]').type(userPassword);
      cy.get('[data-cy="submit-login"]').click();
      cy.contains("Email is required.").should("be.visible");
    });

    it("should show error for invalid email format", () => {
      cy.visit("https://wonderworld-2a0e3.web.app/");
      cy.get(".login").click();
      cy.get('[data-cy="input-login-email"]').type("invalid-email");
      cy.get('[data-cy="input-login-password"]').type(userPassword);
      cy.get('[data-cy="submit-login"]').click();
      cy.contains("Email is required.").should("be.visible");
    });

    it("should show error when password is missing", () => {
      cy.visit("https://wonderworld-2a0e3.web.app/");
      cy.get(".login").click();
      cy.get('[data-cy="input-login-email"]').type(userEmail);
      cy.get('[data-cy="input-login-password"]').clear();
      cy.get('[data-cy="submit-login"]').click();
      cy.contains("Password is required.").should("be.visible");
    });
  });
});

describe("Borrow book", () => {
  beforeEach(() => {
    cy.login(userEmail, userPassword);
  });

  it("should borrow a book", () => {
    cy.url().should("include", "/user");

    cy.get(".logo").click();
    cy.wait(2000);
    cy.get('[data-cy="new-arrival-first-book"] > :nth-child(1)').click();
    cy.get('[data-cy="button-borrow-book"]').click();
    cy.get('[data-cy="button-borrow-book"]').should("have.class", "disabled");
  });
});

describe("Return book", () => {
  beforeEach(() => {
    cy.login(userEmail, userPassword);
  });

  it("should return a book", () => {
    cy.url().should("include", "/user");

    cy.get('[data-cy="book"]').should("have.length.greaterThan", 0);
    cy.get(".btn").contains("Return Book").click();
    cy.get(".book").should("not.exist");
  });
});
