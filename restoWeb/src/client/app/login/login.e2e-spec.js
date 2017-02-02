//Reference for writing tests: http://www.protractortest.org/#/api

describe("RESTOTOUCH TEST CASES", function () {

  beforeEach(function () {
    browser.get('http://localhost:5555/');
  });

  it("Display the correct text of the title on the welcome page", function () {
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
    //expect(browser.isElementPresent(element(by.className('card-block')))).toBe(false);
  });

  it("Create a valid restaurant", function () {
    browser.get(browser.baseUrl + 'dashboard/restaurants');
    var addRestoBtn = element(by.id('addRestoBtn'));
    addRestoBtn.click();

    //Enter restaurant information
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/restaurant');
    element(by.id("name")).sendKeys("restoName");
    element(by.id("description")).sendKeys("Restaurant description");
    element(by.id("address")).sendKeys("540 Test Address");

    //Click on the create restaurant button
    var createRestoBtn = element(by.id('createRestoBtn'));
    createRestoBtn.click();

    //Verify that user gets redirected to correct page, and that an element (the 
    //created restaurant) is present on the restaurant-list page.
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/restaurants');
    expect(browser.isElementPresent(element(by.className('card-block')))).toBe(true);
  })

  it("Create a valid order item", function () {
    browser.get(browser.baseUrl + 'dashboard/items');
    var addItemBtn = element(by.id('addItemBtn'));
    addItemBtn.click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/item');

    //Enter valid item information
    element(by.id("name")).sendKeys("Item Name");
    element(by.id("description")).sendKeys("Short item description");
    element(by.name("sizeName")).sendKeys("TestSize");
    element(by.id("price")).sendKeys(5);

    //Add a valid item size
    var addSizeBtn = element(by.id('addSizeBtn'));
    addSizeBtn.click();

    //Add a valid ingredient group
    var addIngredientGroupBtn = element(by.id('addIngredientGroupBtn'));
    addIngredientGroupBtn.click();
    element(by.name("ingredientGroupName")).sendKeys("Ingredient group test");
    var confirmIngredientGroupBtn = element(by.id('confirmIngredientGroupBtn'));
    confirmIngredientGroupBtn.click();

    //Click on the create restaurant button
    var createItemBtn = element(by.id('createItemBtn'));
    createItemBtn.click();

    //Verify that user gets redirected to correct page, and that an element (the 
    //created restaurant) is present on the restaurant-list page.
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/items');
    expect(browser.isElementPresent(element(by.className('card-block')))).toBe(true);
  });

});

