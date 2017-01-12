import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {LanguageService} from '../services/language.service';
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

  constructor(private languageService: LanguageService) {
    languageService.supplyLanguageModalPicker(() => {
      this.childModal.show()
    });
  }
}
