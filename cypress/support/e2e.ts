import "./commands";

before(() => {
  cy.fixture("credentials").then((data) => {
    Cypress.env("credentials", data);
  });
});
