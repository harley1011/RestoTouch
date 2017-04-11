/* tslint:disable */
// IONIC:

import any = jasmine.any;
export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

export class FormMock {
  public register(): any {
    return true;
  }
}

export class NavMock {

  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }
}

export class NavParamMock {

  public get(param: string): any {

    //mocking ionic codes
    if (param === 'menu') {
      return {'id': '1', 'translations': [{'languageCode':'en'}], 'selectedTranslation': {}};
    }

    if (param === 'language') {
      return 'en';
    }
    //fixed the error of initialisation for menu-list.spec and ingredient groups.spec
    if(param === 'restaurant') {
      return {'Menus': [], 'translations': []};
    }

    // if(param === 'item') {
    //   return {'translations': [{'name': 'Oreo English', 'description': 'Oreo English Lang', 'languageCode': 'en'},
    //                            {'name': 'Oreo French', 'description': 'Oreo French Lang', 'languageCode': 'fr'} ]};
    // }

    //needed for fixing welcome.spec.ts initialisation
    if (param === 'ingredientGroupIndex') {
      return 0;
    }

    if (param === 'item') {
      return {
        translations: {},
        ingredientGroups: [
          {
            translations: [],
            ingredients: []
          }
        ]
      };
    }

    if (param === 'total') {
      return 20.00;
    }

    if (param === 'order') {
      return {
        orderedItems: [],
        total: 0,
        paymentId: ''
      }
    }

  }

}


export class PlatformMock {
  public ready(): Promise<{String}> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }
}

export class MenuMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

/* tslint:enable */
