import {Component, OnInit, ViewChild} from '@angular/core';
import {Combo} from '../../shared/models/combo';
import {ComboListService} from '../combo-list/combo-list.service';
import {Language} from '../../shared/models/language';
import {Router} from '@angular/router';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';

@Component({
  moduleId: module.id,
  selector: 'combo-list-cmp',
  templateUrl: 'combo-list.component.html',
    providers: [ComboListService]
})

export class ComboListComponent implements OnInit {
  combos: Array<Combo>;

  @ViewChild(TranslationSelectComponent)
  private translationSelectComponent: TranslationSelectComponent;
  constructor(private comboService: ComboListService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCombos();
  }

  getCombos(): void {
    this.comboService.getCombos().subscribe(
      combos => {
        this.combos = combos;
        console.warn(this.combos);
        combos.forEach(combo => {
          combo.selectedTranslation = combo.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelectLanguage(language: Language) {
    this.combos.forEach(combo => {
      combo.selectedTranslation = combo.translations.find(translation => translation.languageCode === language.languageCode);
    });
  }

  add(): void {
    this.router.navigate(['/dashboard/combo']);
  }

  modify(combo: Combo): void {
    this.router.navigate(['/dashboard/combos', combo.id]);
  }
}
