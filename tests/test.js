//https://learn.javascript.ru/testing
describe("pow", function() {

    it("возводит в n-ю степень", function() {
      assert.equal(pow(2, 3), 8);
      assert.equal(pow(3, 4), 81);
    });
  
  });
function pow(a,b) {
    return Math.pow(a,b); // :) мы - мошенники!
  }