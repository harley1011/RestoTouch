import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ComboService} from './combo.service';
import {Combo, ComboTranslations} from '../../shared/models/combo';
import {Language} from '../../shared/models/language';
import { ItemService } from '../item/item.service';
import { Item } from '../../shared/models/items';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';

@Component({
	moduleId: module.id,
	selector: 'combo-cmp',
	templateUrl: 'combo.component.html',
  providers: [ComboService,ItemService],
})

export class ComboComponent implements OnInit {
  create: boolean;
  combo: Combo;
	items: Array<Item>;
  errorMessage: string;
  dollarAmount = false;
  percDisc = false;
  fixedPrice = false;
  priceSelected = false;
  foodItemList: Array<string> = ['Spaghetti', 'Hamburger', 'Tiramisu', 'Espresso' ];
  categoryList: Array<string> = ['Appetizer', 'Main Meal', 'Dessert', 'Drink' ];
  categorySelected: Array<string>;
  combos: Array<Combo>;
  @ViewChild(TranslationSelectComponent) translationSelectComponent: TranslationSelectComponent;

  constructor(private route: ActivatedRoute,
              private comboService: ComboService,
              private router: Router,
              private itemService: ItemService) {
    this.categorySelected =[];

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
}

    /*
    * store chosen category into array
    */
    function saveCategory(catChoosen: string, catId: any): void {
      var found = false;

      // add the first category to array
      if (this.categorySelected.length===0) {
        this.categorySelected.push(catChoosen);
        document.getElementById(catId).className='btn btn-primary'; // change color of the chosen category
        document.getElementById('e').className='btn btn-secondary'; // reset "no category" button to no color
        found = true;
      }else {
        // check if category is already in array, avoid duplicates
        for(var i = 0; i < this.categorySelected.length; i++ ) {
          if (catChoosen===this.categorySelected[i]) {
            this.categorySelected.splice(i, 1); // remove chosen category from array, act like a toggle
            document.getElementById(catId).className='btn btn-secondary'; // reset back to no color
            found = true;
          }
        }
      }

      // if category is not already in the array, add to it
      if (!found) {
        this.categorySelected.push(catChoosen);
        document.getElementById(catId).className='btn btn-primary';// change color of the chosen category
      }

      // remove all elemenets from array if "No category" is choosen
      if ('No Category'===catChoosen) {
        this.categorySelected.splice(0, this.categorySelected.length); // remove everything from array
        this.resetCategoryCssClass(); // reset back to no color
        document.getElementById('e').className='btn btn-primary';// change color of the no category button
      }
    }

    /*
    * reset color of the category to no color
    */
    function resetCategoryCssClass(){
      for(var i = 0; i < this.categoryList.length; i++){
        document.getElementById(i.toString()).className='btn btn-secondary';
      }
    }

    /*
    * displaying the text depending on the price/discount type chosen
    */
    function priceTypeSelected(ptype: number): void {
      this.priceSelected = true;
      this.percDisc = false;
      this.fixedPrice = false;
      this.dollarAmount = false;
      if(ptype===1){
        this.dollarAmount = true;
      } else if(ptype===2){
        this.percDisc = true;
      } else {
        this.fixedPrice = true;
      }
    }
