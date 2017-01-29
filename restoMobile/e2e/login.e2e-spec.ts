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
   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
   console.log(loginTitle.getAttribute('textContent')); //TODO y not able to give me text
   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    expect(loginTitle.getAttribute('textContent')).toEqual('Hello');
  });

  /*  it('should translate', () => {
   expect('test').toEqual('test');
   });*/

  /* it('should able to login', () => {
   //element(by.model('email')).sendKeys('samer@gmail.com');
   //browser.sleep(10000);
   //element(by.model('password')).sendKeys('password');
   //browser.sleep(10000);
   browser.waitForAngular();
   });*/

});

