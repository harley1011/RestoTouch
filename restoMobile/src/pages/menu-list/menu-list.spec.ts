 import { async, ComponentFixture } from '@angular/core/testing';
 import { TestUtils } from '../../test';
 import { MenuListPage } from './menu-list';


 let fixture: ComponentFixture<MenuListPage> = null;
 let instance: any = null;//MenuListPage = null;

 describe('Pages: MenuListPage', () => {

   beforeEach(async(() => TestUtils.beforeEachCompiler([MenuListPage]).then(compiled => {
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

   it('sets a translation for a menu', () => {
     let mockMenu = {
       translations: [
         {languageCode: 'en', name: 'ENGLISH'},//identifier
         {languageCode: 'fr', name: 'FRENCH'}
       ],
       selectedTranslation: null,//result of the function
     };

     instance.translate = {};
     instance.translate.currentLang = 'fr';

     expect(mockMenu.selectedTranslation).toBeNull();
     expect(instance.setTranslationForMenu(mockMenu).selectedTranslation.name).toEqual('FRENCH');

     instance.translate.currentLang = 'en';

     expect(instance.setTranslationForMenu(mockMenu).selectedTranslation.name).toEqual('ENGLISH');
   });

 });

