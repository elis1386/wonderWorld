/// <reference types="cypress" />

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("https://wonderworld-2a0e3.web.app/");
  cy.get(".login").click();
  cy.get('[data-cy="input-login-email"]').type(email);
  cy.get('[data-cy="input-login-password"]').type(password);
  cy.get('[data-cy="submit-login"]').click();
});

Cypress.Commands.add("loginFromFixture", () => {
  const { userEmail, userPassword } = Cypress.env("credentials");
  cy.login(userEmail, userPassword);
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      loginFromFixture(): Chainable<void>;
    }
  }
}

export {};
