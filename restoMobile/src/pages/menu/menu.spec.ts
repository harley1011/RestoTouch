
import { async, ComponentFixture } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { MenuPage } from './menu';



let fixture: ComponentFixture<MenuPage> = null;
let instance: any = null;//MenuPage = null;

describe('Pages: MenuPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([MenuPage]).then(compiled => {
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


