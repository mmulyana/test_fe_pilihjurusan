describe("Can see hello world", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173");
    cy.get("p").contains("hello world", { matchCase: false });
  });
});
