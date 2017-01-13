//Reference for writing tests: http://www.protractortest.org/#/api

describe("TEST CASES FOR LOGIN PAGE", function () {

  beforeEach(function () {
    browser.get('http://localhost:5555/');
  });

  it("Correct text display of the tag element title", function () {
    var loginTitle = browser.getTitle();
    expect(loginTitle).toEqual("RestoTouch");
  });

  //Assuming Registered User:
  // - username: test@gmail.com
  // - password: test
  it("Diplay correct webpage after log in", function () {
    element(by.id("email")).sendKeys("test@gmail.com");
    element(by.id("password")).sendKeys("test");
    var loginBtn = element(by.id('loginBtn'));
    loginBtn.click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/home');
  });

});

