//Reference for writing tests: http://www.protractortest.org/#/api
import { browser, element, by, ElementFinder } from 'protractor';
//import { LoginPage } from '../pages/login/login';

describe("Login Page::", () => {
  beforeEach(() => {
    browser.get('');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Ionic App');
    console.log(browser.getTitle());
  });

});
