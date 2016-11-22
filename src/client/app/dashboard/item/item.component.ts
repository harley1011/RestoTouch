import {Component, OnInit} from '@angular/core';
import {Item} from './../../shared/models/items';
import {Size} from './../../shared/models/size';
import {ItemService} from './item.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';
@Component({
  moduleId: module.id,
  selector: 'item-cmp',
  templateUrl: 'item.component.html',
  providers: [ItemService]
})

export class ItemComponent implements OnInit {
  create: boolean;
  item: Item;
  size = new Size('', 0);
  errorMessage: any;

  //Translation Support
  languages: Array<Language>;
  addedLanguage: string;
  supportedLanguages: Array<Language> = [];
  selectedLanguage: Language = new Language('','','',0);


  constructor(private itemService: ItemService,
              private router: Router,
              private route: ActivatedRoute,
              private languageService: LanguageService) {
    this.languages = languageService.languages();
    languageService.selectedLanguageAnnounced$.subscribe(selectedLanguage => {
      this.selectedLanguage = selectedLanguage;
    });
    //default to english
    this.supportedLanguages.push(this.languages.find(language => language.languageCode === 'en'));
    languageService.announceSupportedLanguages(this.supportedLanguages);
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        this.itemService.getItem(params['id']).subscribe(item => {
          this.item = item;
          //this.supportedLanguages = item.supportedLanguages;
          //this.selectedLanguage = item.supportedLanguages[0];
          //this.languageService.announceSupportedLanguages(this.supportedLanguages);
          //this.languageService.announceSelectedLanguage(this.selectedLanguage);
          this.create = false;
        }, error => {
          console.log(error);
        });
      } else {
        this.item = new Item('', '', this.supportedLanguages, '', []);
        this.create = true;
      }
    });
  }

  onSubmit() {
    if (this.create) {
      this.itemService.addItem(this.item).subscribe(
        generalResponse => {
          this.router.navigate(['/dashboard/items']);
        },
        error => {
          this.errorMessage = <any> error;
        });
    } else {
      this.itemService.updateItem(this.item).subscribe(
        generalResponse => {
          this.router.navigate(['/dashboard/items']);
        },
        error => {
          this.errorMessage = <any> error;
        });
    }

  }

  addLanguage() {
    let language = this.supportedLanguages.find(language => language.languageCode === this.addedLanguage);
    if(language) {
      console.log('Language is already supported.');
      return;
    }
    language = this.languages.find(language => language.languageCode === this.addedLanguage);
    this.supportedLanguages.push(language);
  }

  removeLanguage(language: Language) {
    if (this.supportedLanguages.length < 1) {
      console.log('At least one language is required.');
    }
    let i = this.supportedLanguages.indexOf(language);
    this.supportedLanguages.splice(i, 1);
  }

  addSize() {
    this.item.sizes.push(this.size);
    this.size = new Size('', 0);
  }

  removeSize(size: Size) {
    let sizeToRemove = this.item.sizes.find(currentSize => currentSize.name === size.name);
    this.item.sizes.splice(this.item.sizes.indexOf(sizeToRemove), 1);
  }

  deleteItem() {
    this.itemService.deleteItem(this.item.id).subscribe(response => {
      this.router.navigate(['/dashboard/items']);
    });
  }

  cancelItem() {
    this.router.navigate(['/dashboard/items']);
  }
}
