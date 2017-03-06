import { async, ComponentFixture } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { HomePage } from './home';


let fixture: ComponentFixture<HomePage> = null;
let instance: any = null;//HomePage = null;

describe('Pages: HomePage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([HomePage]).then(compiled => {
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
