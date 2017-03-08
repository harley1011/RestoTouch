
 import { async, ComponentFixture } from '@angular/core/testing';
 import { TestUtils } from '../../test';
 import { SettingsPage } from './settings';


 let fixture: ComponentFixture<SettingsPage> = null;
 let instance: any = null;//SettingsPage = null;

 describe('Pages: SettingsPage', () => {

 beforeEach(async(() => TestUtils.beforeEachCompiler([SettingsPage]).then(compiled => {
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

