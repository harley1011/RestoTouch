import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {LanguageService} from '../services/language.service';
import {Language} from '../../../../../restoCommon/shared/models/language';

/**
 *  This class represents the lazy loaded DashboardComponent.
 */

@Component({
  moduleId: module.id,
  selector: 'dashboard-cmp',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {
  @ViewChild('childModal') public childModal: ModalDirective;
  languages: Array<Language>;
  selectedLanguage: Language;

  constructor(private languageService: LanguageService) {
    languageService.supplyLanguageModalPicker(() => {
      this.childModal.show()
    });

    this.languages = languageService.languages();
  }

  addLanguage(){
    this.languageService.addSupportedLanguage(this.selectedLanguage);
    this.childModal.hide();
  }
}
