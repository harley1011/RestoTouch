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
    expect(browser.baseUrl + 'dashboard/restaurants').toEqual( browser.baseUrl + 'dashboard/restaurants');
    expect(browser.isElementPresent(element(by.className('card-block')))).toBe(false);
  });

  it("Create a valid restaurant", function () {
    //This no longer works because the btn is in an *ngIf Div.
    //Found a fix for Angular 1 only, will investigate for Angular 2.

    //browser.get(browser.baseUrl + 'dashboard/restaurants');
    //var div = element(by.id("buttonVisible"));
    //expect(div.evaluate("ng_if_value")).toBe(false);
    //var addRestoBtn = element(by.id('btn'));
    //addRestoBtn.click();

    //Enter restaurant information
    browser.get(browser.baseUrl + 'dashboard/restaurant');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/restaurant');
    element(by.id("name")).sendKeys("restoName");
    element(by.id("description")).sendKeys("Restaurant description");
    element(by.id("address")).sendKeys("540 Test Address");
    element(by.id("pricetype")).click();

    //Click on the create restaurant button
    var createRestoBtn = element(by.id('createRestoBtn'));
    createRestoBtn.click();

    //Verify that user gets redirected to correct page, and that an element (the
    //created restaurant) is present on the restaurant-list page.
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/restaurants');
    expect(browser.isElementPresent(element(by.className('card-block')))).toBe(true);
  });

  it("Create a valid food item", function () {
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
    element(by.name("newIngredientName")).sendKeys("Ingredient name test");
    var confirmIngredientGroupBtn = element(by.id('confirmIngredientGroupBtn'));
    confirmIngredientGroupBtn.click();

    //Click on the create restaurant button
    var createItemBtn = element(by.id('createItemBtn'));
    createItemBtn.click();

    //Verify that user gets redirected to correct page, and that an element (the
    //created food item) is present on the item-list page.
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/items');
    expect(browser.isElementPresent(element(by.className('card-block')))).toBe(true);
  });

  it("Create a valid category", function () {
    browser.get(browser.baseUrl + 'dashboard/categories');
    var addCategoryBtn = element(by.id('addCategoryBtn'));
    addCategoryBtn.click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/category');

    //Enter valid category information
    element(by.id("name")).sendKeys("Category Name");

    //Click on the create category button
    var createCategoryBtn = element(by.id('createCategoryBtn'));
    createCategoryBtn.click();

    //Verify that user gets redirected to correct page, and that an element (the
    //created category) is present on the category-list page.
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/categories');
    expect(browser.isElementPresent(element(by.className('card-block')))).toBe(true);
  });

  it("Create a valid menu", function () {
    browser.get(browser.baseUrl + 'dashboard/menus');
    var addMenuBtn = element(by.id('addMenuBtn'));
    addMenuBtn.click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/menu');

    //Enter valid menu information
    element(by.id("name")).sendKeys("Menu Name");

    //Click on the create menu button
    var createMenuBtn = element(by.id('createMenuBtn'));
    createMenuBtn.click();

    //Verify that user gets redirected to correct page, and that an element (the
    //created menu) is present on the menu-list page.
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/menus');
    expect(browser.isElementPresent(element(by.className('card-block')))).toBe(true);
  });

  it("Deletes a menu", function () {
    browser.get(browser.baseUrl + 'dashboard/menus');
    var menu = element(by.className('card'));
    menu.click();
    var deleteMenuBtn = element(by.id('deleteMenuBtn'));
    deleteMenuBtn.click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/menus');
    expect(browser.isElementPresent(element(by.className('card-block')))).toBe(false);
  });

  it("Deletes a category", function () {
    browser.get(browser.baseUrl + 'dashboard/categories');
    var category = element(by.className('card'));
    category.click();
    var deleteCategoryBtn = element(by.id('deleteCategoryBtn'));
    deleteCategoryBtn.click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/categories');
    expect(browser.isElementPresent(element(by.className('card-block')))).toBe(false);
  });

  it("Deletes an item", function () {
    browser.get(browser.baseUrl + 'dashboard/items');
    var item = element(by.className('card'));
    item.click();
    var deleteItemBtn = element(by.id('deleteItemBtn'));
    deleteItemBtn.click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/items');
    expect(browser.isElementPresent(element(by.className('card-block')))).toBe(false);
  });

  it("Deletes a restaurant", function () {
    browser.get(browser.baseUrl + 'dashboard/restaurants');
    var restaurant = element(by.className('card'));
    restaurant.click();
    var deleteRestaurantBtn = element(by.id('deleteRestaurantBtn'));
    deleteRestaurantBtn.click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/restaurants');
    expect(browser.isElementPresent(element(by.className('card-block')))).toBe(false);
  });

  it("Diplay correct webpage after log out", function () {
    browser.get(browser.baseUrl + 'dashboard/home');
    var dropdown = element(by.className('dropdown-toggle'));
    dropdown.click();
    var logoutBtn = element(by.id('logout'));
    logoutBtn.click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'logout');
  });

  it("Login as a cashier mode", function () {
    browser.get('http://localhost:5555/');
    element(by.id("email")).sendKeys("test@gmail.com");
    element(by.id("password")).sendKeys("test");

    var isEmployee = element(by.id('isEmployee'));
    isEmployee.click();

    var loginBtn = element(by.className('loginBtn'));
    loginBtn.click();

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'dashboard/restaurants');
  });

});

