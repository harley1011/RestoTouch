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
  categories: Array<Category>=[];
  categoryShowing: Category;
  categorySelected: Array<string>=[];
  catToFill: Array<Category>=[];
  currentSelectedCat: string;
  combos: Array<Combo>;
  fillNocat: boolean;
  selectedCatFill:false;
  isVisibleSS: boolean = false;
  isAvailable: boolean = false;
  cssClass ='btn btn-secondary';
  showCss: boolean = false;

  @ViewChild(TranslationSelectComponent) translationSelectComponent: TranslationSelectComponent;

  constructor(private route: ActivatedRoute,
              private comboService: ComboService,
              private categoryService: CategoryService,
              private router: Router,
              private itemService: ItemService) {
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
        let translation = new ComboTranslations('', '', this.translationSelectComponent.selectedLanguage.languageCode,null,'');
        this.combo = new Combo([translation], translation, []);
        this.getItems();
        this.create = true;
      }
    });
    console.log("after getcombo: ", this.categories);
  }

  onSelectLanguage(language: Language) {
    let comboTranslation = this.combo.translations.find(translation =>
    translation.languageCode === language.languageCode);
    if (!comboTranslation) {
      comboTranslation = new ComboTranslations('', '', language.languageCode,null,'');
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
        this.combo.categories.forEach(function(cat){
          cat.selectedTranslation = cat.translations[0];
          cat.items.forEach(item => {
            item.selectedTranslation = item.translations[0];
          });
        });
        this.priceTypeSelected(this.combo.selectedTranslation.discountFlag);
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
    this.combo.categories = this.catToFill;

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
        this.router.navigate(['/dashboard/combos']);
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

  cancel(): void {
    this.router.navigate(['/dashboard/combos']);
  }

////// Handle categories item
  getCategories(): void {
    console.log('from getcat: ', this.combo);
    this.catToFill = this.combo.categories;
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        categories.forEach(category => {
          category.selectedTranslation = category.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
          category.items = []; // wipe existing items
        });
        console.log(this.categories);
      },
      error => {
        console.log(error);
      }
    );

  }

	getItems(): void {
    this.getCategories();
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

        let exists = false;
        for(var i=0; i< this.combo.categories.length; i++){
          for (var j=0; j< this.combo.categories[i].items.length; j++){
            for(var k=0; k<this.items.length; k++){
              if (this.items[k].sizes[0].id===this.combo.categories[i].items[j].sizes[0].id){
                exists = true;
                break;
              }
            }
              if(exists){
              exists = false;
              this.items.splice(k,1);
              continue;
            }
          }
        }

        console.log("after getItems: ",this.categories);
      this.colorCategoryListForExistingCombo(this.catToFill, this.categories); // place here due to timing of page finishing loading
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
    //console.warn(catin.items);
    catin.items.forEach(item => {
      this.items.push(item);
    });
     catin.items = [];
  }

fillCatSelected(catin: any, catId: any): void {
  // this.fillNocat = false;
  this.categoryShowing = catin;
  this.resetCategoryCssClass(this.catToFill);
  document.getElementById(catin.selectedTranslation.name).className='btn btn-primary';// change color of the chosen category
}



/*
* store chosen category into array
*/
 colorCategoryListForExistingCombo(c1: Array<Category>, c2: Array<Category>): void {
   console.log("color: ", c2);
   for(var i =0; i< c1.length; i++){
              for(var j = 0; j < c2.length; j++ ) {
              if (c2[j].selectedTranslation.name===c1[i].selectedTranslation.name) {
                document.getElementById(j.toString()).className='btn btn-primary';// change color of the chosen category
                console.log("color me dammit");
              }
            }
          }

  // this.categoryService.getCategories().subscribe(
  //       categories => {
  //         categories.forEach(category => {
  //           category.selectedTranslation = category.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
  //           category.items = []; // wipe existing items
  //         });
  //         this.categories = categories;
  //         this.catToFill = this.combo.categories;
  //         console.log(this.catToFill);

  //     ////////////////////////////////
  //     function toggleCssClass(): void {
  //     if(this.cssClass==='btn btn-primary'){
  //       this.cssClass = 'btn btn-secondary';
  //       this.isVisibleSS = true;
  //     } else this.cssClass = 'btn btn-primary';
  //     }
  //     },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  }

//////////////////////////////////////////////////////////////////////////
/*
* store chosen category into array
*/
 saveCategory(catin: any, catId: any): void {
  // this.categoryService.getCategories().subscribe(
  //       categories => {
  //         this.categories = categories;
  //         categories.forEach(category => {
  //           category.selectedTranslation = category.translations.find(translation => translation.languageCode === this.translationSelectComponent.selectedLanguage.languageCode);
  //           category.items = []; // wipe existing items
  //         });
  //         console.log('saveCat: ',this.combo);
  //         this.catToFill = this.combo.categories;
  //

  //     },
  //       error => {
  //         console.log(error);
  //       }
  //     );

       /////////// TO Refactor //////////
          var found = false;
          var catChoosen = catin.selectedTranslation.name;
          console.log("after getcombo: ", this.categories);
          //this.colorCategoryListForExistingCombo(this.catToFill, this.categories);
          // add the first category to array
          if (this.catToFill.length===0) {
            this.catToFill.push(catin);
            //this.cssClass='btn btn-primary';
            //this.categorySelected.push(catChoosen);
            //toggleCssClass();
            document.getElementById(catId.toString()).className='btn btn-primary'; // change color of the chosen category
            //document.getElementById('e').className='btn btn-secondary'; // reset "no category" button to no color
            found = true;
          }else {
            // check if category is already in array, avoid duplicates
            for(var i = 0; i < this.catToFill.length; i++ ) {
              if (catChoosen===this.catToFill[i].selectedTranslation.name) {
                this.removeAllItemsFromCategory(this.catToFill[i]);
                this.catToFill.splice(i,1);
                if(this.catToFill.length < 1) {
                    this.categoryShowing = null;
                }
                //this.cssClass='btn btn-secondary';
                //this.categorySelected.splice(i, 1); // remove chosen category from array, act like a toggle
                document.getElementById(catId.toString()).className='btn btn-secondary'; // reset back to no color
                found = true;
              }
            }
          }

          // if category is not already in the array, add to it
          if (!found) {
            this.catToFill.push(catin);
            //this.categorySelected.push(catChoosen);
            document.getElementById(catId.toString()).className='btn btn-primary';// change color of the chosen category
            //this.cssClass='btn btn-primary';
          }
      ////////////////////////////////
      function toggleCssClass(): void {
      if(this.cssClass==='btn btn-primary'){
        this.cssClass = 'btn btn-secondary';
        this.isVisibleSS = true;
      } else this.cssClass = 'btn btn-primary';
      }
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
  priceTypeSelected(ptype: string): void {
      this.priceSelected = true;
      this.percDisc = false;
      this.fixedPrice = false;
      this.dollarAmount = false;
      if(ptype==='d'){
        this.dollarAmount = true;
      } else if(ptype==='p'){
        this.percDisc = true;
      } else {
        this.fixedPrice = true;
      }
    }

    /*
    * reset color of the category to no color
    */
    resetCategoryCssClass(c: any){
      for(var i = 0; i < c.length; i++){
        document.getElementById(c[i].selectedTranslation.name).className='btn btn-secondary';
      }
    }

    checkbox(cat:any) {
      cat.selected = (cat.selected) ? false : true;
    }

    getCssClass(){
      if(this.showCss){
        return "btn btn-primary";
      }
      else{
        return "btn btn-secondary";
      }
    }

}

