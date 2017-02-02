//Reference for writing tests: http://www.protractortest.org/#/api

describe("TEST CASES FOR LOGIN PAGE", function () {

  beforeEach(function () {
    browser.get('http://localhost:5555/');
  });

  it("Display the correct text of the tag element title", function () {
    var loginTitle = browser.getTitle();
    expect(loginTitle).toEqual("RestoTouch");
  });

  //Assuming Registered User:
  // - username: test@gmail.com
  // - password: test
  it("Diplay correct webpage after log in", function () {
    element(by.id("email")).sendKeys("test@gmail.com");
    element(by.id("password")).sendKeys("test");
    var loginBtn = element(by.className('loginBtn'));
    loginBtn.click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/home');

  });

  it("Navigate to the restaurant page", function () {
    browser.get(browser.baseUrl + 'dashboard/restaurants');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/restaurants');
  });

  it("Create a valid restaurant", function () {
    browser.get(browser.baseUrl + 'dashboard/restaurants');
    var addRestoBtn = element(by.id('addRestoBtn'));
    addRestoBtn.click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/restaurant');
    element(by.id("name")).sendKeys("restoName");
    element(by.id("description")).sendKeys("Restaurant description");
    element(by.id("address")).sendKeys("540 Test Address");
    var createrestoBtn = element(by.id('createRestoBtn'));
    createrestoBtn.click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/restaurants');
  })

});

