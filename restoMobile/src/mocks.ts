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
      return {'id': '1'};
    }

    if (param === 'language') {
      return 'en';
    }

    if(param === 'restaurant') {
      return {'Menus': []};
    }

    if(param === 'item') {
      return {'translations': [{'name': 'Oreo English', 'description': 'Oreo English Lang', 'languageCode': 'en'},
                               {'name': 'Oreo French', 'description': 'Oreo French Lang', 'languageCode': 'fr'} ]};
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
