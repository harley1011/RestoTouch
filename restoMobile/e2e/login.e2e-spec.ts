//Reference for writing tests: http://www.protractortest.org/#/api
import { browser, element, by, ElementFinder } from 'protractor';
//import { LoginPage } from '../pages/login/login';

//let removeButton: ElementFinder = element.all(by.in)
//let loginHeader: ElementFinder = element(by.className('loginHeader'));
let loginHeader: ElementFinder = element.all(by.id('loginHeader')).first();
//let loginHeader: element

describe("Login Page::", () => {
  beforeEach(() => {
    browser.get('http://localhost:8100/');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Ionic App');
    console.log(browser.getTitle());
  });

  it('should have a login title', () => {
   let loginTitle = element(by.id('loginHeader'));
    expect(loginTitle.getAttribute('textContent')).toEqual('Hello');
  });

  /*  it('should translate', () => {
   expect('test').toEqual('test');
   });*/

   it('should able to login', () => {
   browser.sleep(1000);
   element(by.id('userEmail')).sendKeys('samer@gmail.com');
   browser.sleep(1000);
   element(by.id('userPassword')).sendKeys('password');
   element(by.id('loginButton')).click();
   //browser.sleep(10000);
   //browser.waitForAngular();
   });

});

