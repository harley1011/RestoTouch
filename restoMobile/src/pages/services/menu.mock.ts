import { Observable } from '@angular2/core';
import { EventEmitter } from '@angular/core';

export class MenuServiceMock {

  public static TESTMENU = {'translations': [], 'selectedTranslation': {}, 'categories': [], 'disabledCategoryItems': [], 'id': 1};

  // I changed it to any because of it gave me an error, types of selected translation are incompatable.
  getMenu (menuId: number): any {

    // The problem is using rxjs reactive observable and (reactive flow). So if you have a menu thats an obsevable.
    // I am using angular equivalent of observables which called event emitters which i will return a event emitter.

    // This code when we get an event from the observable
    let em = new EventEmitter();
    // Trying to mock out reactive observable
    // I am setting a timeout so that i emit TESTMENU before the observable returns menu observable thus making '.subscribe('
    // function to be called with TESTMENU.
    setTimeout(em.emit(MenuServiceMock.TESTMENU), 100);
    return em;

  }
}
