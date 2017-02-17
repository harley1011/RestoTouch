import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ComboService} from './combo.service';
import {Combo, ComboTranslations} from '../../shared/models/combo';
import {Language} from '../../shared/models/language';
import { ItemService } from '../item/item.service';
import { Item, ItemTranslations } from '../../shared/models/items';
import {Size} from '../../shared/models/size';
import {TranslationSelectComponent} from '../../shared/translation-select/translation-select.component';
import {CategoryService} from '../category/category.service';
import {Category} from '../../shared/models/category';

@Component({
	moduleId: module.id,
	selector: 'combo-cmp',
	templateUrl: 'combo.component.html',
  providers: [ComboService,ItemService,CategoryService],
})

export class ComboComponent implements OnInit {
  create: boolean;
  combo: Combo;
  noCat: Category;
	items: Array<Item>;
  errorMessage: string;
  dollarAmount = false;
  percDisc = false;
  fixedPrice = false;
  priceSelected = false;
  //foodItemList: Array<string> = ['Spaghetti', 'Hamburger', 'Tiramisu', 'Espresso' ];
  categories: Array<Category>;
  categoryShowing: Category;
  categorySelected: Array<string>;
  catToFill: Array<Category>;
  combos: Array<Combo>;
  fillNocat: boolean;
  selectedCatFill:false;
  @ViewChild(TranslationSelectComponent) translationSelectComponent: TranslationSelectComponent;

  constructor(private route: ActivatedRoute,
              private comboService: ComboService,
              private categoryService: CategoryService,
              private router: Router,
              private itemService: ItemService) {
    this.categorySelected =[];
    this.catToFill = [];
    this.categoryShowing = null;
    // this.fillNocat = false;
  }


  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        this.getCombo(params['id']);
        this.create = false;
      } else {
        //console.warn(this.translationSelectComponent.selectedLanguage.languageCode);
        let translation = new ComboTranslations('', '', this.translationSelectComponent.selectedLanguage.languageCode);
        this.combo = new Combo([translation], translation, []);
        this.getItems();
        this.create = true;
      }

      this.getCategories();
    });
  }

  onSelectLanguage(language: Language) {
    let comboTranslation = this.combo.translations.find(translation =>
    translation.languageCode === language.languageCode);
    if (!comboTranslation) {
      comboTranslation = new ComboTranslations('', '', language.languageCode);
      this.combo.translations.push(comboTranslation);
    }
    this.combo.selectedTranslation = comboTranslation;
  }

  getCombo(id: number): void {
    this.comboService.getCombo(id).subscribe(
      combo => {
        this.combo = combo;
        this.getItems();
        this.onSelectLanguage(this.translationSelectComponent.selectedLanguage);
        //this.combo.items.forEach(item => {
        //  item.selectedTranslation = item.translations[0];
        //});
        console.warn(combo);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  addAndUpdate(): void {
    if (this.create) {
      this.add();
    } else {
      this.update();
    }
  }

  add(): void {
    this.storeItemsInCombo();

    //calling add comboService
    this.comboService.addCombo(this.combo).subscribe(
      generalResponse => {
        this.router.navigate(['/dashboard/combos']);
      },
      error => {
        this.errorMessage = <any> error;
        console.log(this.errorMessage);
      }
    );
  }

  update(): void {
    this.comboService.updateCombo(this.combo).subscribe(
      generalResponse => {
        //this.router.navigate(['/dashboard/combos']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  delete(): void {
    this.comboService.deleteCombo(this.combo).subscribe(
      generalResponse => {
        console.log('response', generalResponse);
        this.router.navigate(['/dashboard/combos']);
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }


////// Handle categories item
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        categories.forEach(category => {
          category.selectedTranslation = category.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
          category.items = []; // wipe existing items
        });

      },
      error => {
        console.log(error);
      }
    );
  }

	getItems(): void {
    this.items = [];

		this.itemService.getItems().subscribe(
			itemsList => {
        itemsList.forEach( item => {
          let parentItem =  item;

          // Clean up
          parentItem.selectedTranslation = item.translations[0];
          parentItem.categories = [];

          // Split item by size
          parentItem.sizes.forEach(itemSize => {
              let tempItem:Item = Object.assign({},parentItem);
              tempItem.sizes = [];
              tempItem.sizes.push(itemSize);
              this.items.push(tempItem);
          });
        });
    	},
      error =>  {
        console.log(error);
      }
    );
	}


  addItemToCategory(item: Item): void {
    item.categories = [];
    //item.categories.push(this.categoryShowing);

    this.items.splice(this.items.indexOf(item), 1);
    this.categoryShowing.items.push(item);
    console.warn(this.catToFill);
		//this.items.sort(compareItem);
		//this.category.items.sort(compareItem);
  }

	removeItemFromCategory(item: Item): void {
    this.categoryShowing.items.splice(this.categoryShowing.items.indexOf(item), 1);
    this.items.push(item);

		//this.items.sort(compareItem);
	//	this.category.items.sort(compareItem);
  }

  removeAllItemsFromCategory(catin: Category): void {
    console.warn(catin.items);
    catin.items.forEach(item => {
      this.items.push(item);
    });
     catin.items = [];
  }

fillCatSelected(catin: any, catId: any): void {
  // this.fillNocat = false;
  this.categoryShowing = catin;
}

storeItemsInCombo(): void {
  var tempCat: Category;

  this.catToFill.forEach(cat => {
    // tempCat=cat;
    // cat.items.forEach(item => {
    //   tempCat.items.push(item);
    // });
    this.combo.categories.push(cat);
  });
}

//////////////////////////////////////////////////////////////////////////
/*
* store chosen category into array
*/
 saveCategory(catin: any, catId: any): void {

      /////////// TO Refactor //////////
      var found = false;
      var catChoosen = catin.selectedTranslation.name;
      // add the first category to array
      if (this.categorySelected.length===0) {
        this.catToFill.push(catin);

        this.categorySelected.push(catChoosen);
        document.getElementById(catId).className='btn btn-primary'; // change color of the chosen category
        //document.getElementById('e').className='btn btn-secondary'; // reset "no category" button to no color
        found = true;
      }else {
        // check if category is already in array, avoid duplicates
        for(var i = 0; i < this.categorySelected.length; i++ ) {
          if (catChoosen===this.categorySelected[i]) {

            this.removeAllItemsFromCategory(this.catToFill[this.catToFill.indexOf(catin)]);
            this.catToFill.splice(this.catToFill.indexOf(catin),1);
            if(this.catToFill.length < 1) {
                this.categoryShowing = null;
            }

            this.categorySelected.splice(i, 1); // remove chosen category from array, act like a toggle
            document.getElementById(catId).className='btn btn-secondary'; // reset back to no color
            found = true;
          }
        }
      }

      // if category is not already in the array, add to it
      if (!found) {
        this.catToFill.push(catin);
        this.categorySelected.push(catChoosen);
        document.getElementById(catId).className='btn btn-primary';// change color of the chosen category
      }
      ////////////////////////////////
  }

  // nocat(): void {
  //     this.categorySelected.splice(0, this.categorySelected.length); // remove everything from array
  //     this.resetCategoryCssClass(); // reset back to no color
  //     document.getElementById('e').className='btn btn-primary';// change color of the no category button
  //     this.catToFill = [];
  //     // this.catToFill.push(this.noCat);
  // }

  /*
  * displaying the text depending on the price/discount type chosen
  */
  priceTypeSelected(ptype: number): void {
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

    /*
    * reset color of the category to no color
    */
    resetCategoryCssClass(){
      for(var i = 0; i < this.categories.length; i++){
        document.getElementById(i.toString()).className='btn btn-secondary';
      }
    }
}

