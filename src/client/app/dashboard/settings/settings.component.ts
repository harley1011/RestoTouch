import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {TranslateService} from 'ng2-translate';

@Component({
  moduleId: module.id,
  selector: 'settings-cmp',
  templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit {


  constructor(private router: Router,
              private translate: TranslateService,) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
  }


  ngOnInit(): void {
    console.log('h');
  }

}
