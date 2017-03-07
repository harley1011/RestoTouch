
 //TODO network error is here
import { async, ComponentFixture } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { WelcomePage } from './welcome';


let fixture: ComponentFixture<WelcomePage> = null;
let instance: any = null;//WelcomePage = null;

describe('Pages: WelcomePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([WelcomePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    fixture.autoDetectChanges(true);
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('initialises', () => {
    expect(fixture).not.toBeNull();
    expect(instance).not.toBeNull();
  });

});

