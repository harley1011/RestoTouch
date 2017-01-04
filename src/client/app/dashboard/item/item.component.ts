import {Component, OnInit, ElementRef, ViewChild, NgZone} from '@angular/core';
import {Item, ItemTranslations} from './../../shared/models/items';
import {IngredientGroup} from './../../shared/models/ingredient-group';

import {Size} from './../../shared/models/size';
import {ItemService} from './item.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {LanguageService} from '../../services/language.service';
import {Language} from '../../shared/models/language';
import {ImageCropperComponent} from 'ng2-img-cropper/src/imageCropperComponent';
import {CropperSettings} from 'ng2-img-cropper/src/cropperSettings';
import {ImageUploadService} from '../../services/image-upload.service';
import {Ingredient} from '../../shared/models/ingredient';


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
  cropperSettings: CropperSettings;
  name: string;
  croppedImageContainer: any;
  croppedImage: any = 'assets/img/default-placeholder.png';
  pictureMode: PictureMode = PictureMode.Select;
  pictureModes = PictureMode;
  progress: number = 0;
  uploading: boolean = false;
  finished: boolean = false;

  @ViewChild(ImageCropperComponent) cropper: ImageCropperComponent;

  //Translation Support
  languages: Array<Language>;
  addedLanguage: string;
  supportedLanguages: Array<Language> = [];
  selectedLanguage: Language = new Language('','','',0);


  constructor(private itemService: ItemService,
              private router: Router,
              private route: ActivatedRoute,
              private languageService: LanguageService,
              private element: ElementRef,
              private imageUploadService: ImageUploadService,
              private zone: NgZone) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 300;
    this.cropperSettings.height = 300;

    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 300;

    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 300;
    this.languages = languageService.languages();
    languageService.selectedLanguageAnnounced$.subscribe(selectedLanguage => {
      this.selectedLanguage = selectedLanguage;
      this.item.selectedTranslation = this.item.translations.find(translation =>
        translation.languageCode === this.selectedLanguage.languageCode);

      if(!this.item.selectedTranslation) {
        this.item.selectedTranslation = new ItemTranslations('','',this.selectedLanguage.languageCode);
        this.item.translations.push(this.item.selectedTranslation);
      }
    });
    //default to english
    this.supportedLanguages.push(this.languages.find(language => language.languageCode === 'en'));
    languageService.announceSupportedLanguages(this.supportedLanguages);

    this.cropperSettings.minWidth = 100;
    this.cropperSettings.minHeight = 100;

    this.cropperSettings.rounded = false;

    this.cropperSettings.noFileInput = true;
    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(64,64,64,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.croppedImageContainer = {};
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        this.itemService.getItem(params['id']).subscribe(item => {
          if (item.imageUrl.length !== 0) {
            this.croppedImage = item.imageUrl;
          }
          item.ingredientGroups.forEach(ingredientGroup => {
            ingredientGroup.newIngredient = new Ingredient('', false, 0, 1);
          });

          item.ingredientGroups.sort((a: IngredientGroup, b: IngredientGroup) => {return a.orderPriority - b.orderPriority;});
          this.item = item;
          this.supportedLanguages = item.supportedLanguages;
          this.item.selectedTranslation = item.translations[0];
          this.selectedLanguage = this.languages.find(language =>
            language.languageCode === this.item.selectedTranslation.languageCode);
          this.languageService.announceSupportedLanguages(this.supportedLanguages);
          this.languageService.announceSelectedLanguage(this.selectedLanguage);
          this.create = false;
          this.pictureMode = PictureMode.Edit;
        }, error => {
          console.log(error);
        });
      } else {
        let translation = new ItemTranslations('','', this.supportedLanguages[0].languageCode);
        this.item = new Item(this.supportedLanguages, [translation], translation, [], [], '', []);
        this.create = true;
        this.pictureMode = PictureMode.Select;
      }
    });
  }

  selectFile() {
    if (this.pictureMode === PictureMode.CropSelected) {
      this.pictureMode = PictureMode.Crop;
    } else if (this.pictureMode === PictureMode.Crop) {
      this.croppedImage = this.croppedImageContainer.image;
      this.pictureMode = PictureMode.CropSelected;
    } else {
      var imageSelector = this.element.nativeElement.querySelector('.item-image-select');
      imageSelector.click();

    }
  }


  onChange(fileInput: File) {
    this.cropper.fileChangeListener(fileInput);
    this.pictureMode = PictureMode.Crop;
  }

  clearImage() {
    this.pictureMode = PictureMode.Select;
    this.croppedImage = 'assets/img/default-placeholder.png';
    this.item.imageUrl = '';
  }

  onSubmit() {
    this.uploading = true;
    if (this.create) {
      var imageSelector = this.element.nativeElement.querySelector('.item-image-select').files[0];

      if (imageSelector) {
        this.imageUploadService.getS3Key(imageSelector.name, imageSelector.type).subscribe((response) => {
          this.item.imageUrl = response.url;

          this.uploadImage(response.url, response.signedRequest);

          this.itemService.addItem(this.item).subscribe(result => {
              this.isFinished();
            },
            error => {
              this.errorMessage = <any> error;
            });
        });
      } else {
        this.itemService.addItem(this.item).subscribe(generalResponse => {
            this.router.navigate(['/dashboard/items']);
          },
          error => {
            this.errorMessage = <any> error;
          });
      }
    } else {
      if (this.item.imageUrl !== this.croppedImage && this.croppedImage !== 'assets/img/default-placeholder.png') {
        var imageSelector = this.element.nativeElement.querySelector('.item-image-select').files[0];

        this.imageUploadService.getS3Key(imageSelector.name, imageSelector.type).subscribe((response) => {
          this.item.imageUrl = response.url;

          this.itemService.updateItem(this.item).subscribe(result => {
              this.isFinished();
            },
            error => {
              this.errorMessage = <any> error;
            });

          this.uploadImage(response.url, response.signedRequest);
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
  }

  uploadImage(url: string, signedRequest: string) {
    this.imageUploadService.progress$.subscribe(data => {
      this.zone.run(() => {
        this.progress = data;
      });
    });
    this.imageUploadService.uploadImage(url, signedRequest,
      this.croppedImageContainer.image).subscribe((result: number) => {
      this.isFinished();
    });
  }

  isFinished() {
    if (this.finished) {
      this.router.navigate(['/dashboard/items']);
    } else {
      this.finished = true;
    }
  }

  changeOrder(ingredientGroup: IngredientGroup, changeIndex: number) {
    let newIndex =  ((ingredientGroup.orderPriority - 1 + changeIndex)
      % this.item.ingredientGroups.length + this.item.ingredientGroups.length) % this.item.ingredientGroups.length;
    let currentIndex = ingredientGroup.orderPriority - 1;
    ingredientGroup.orderPriority = newIndex + 1;
    this.item.ingredientGroups[newIndex].orderPriority = currentIndex + 1;
    this.item.ingredientGroups[currentIndex] = this.item.ingredientGroups[newIndex];
    this.item.ingredientGroups[newIndex] = ingredientGroup;
  }

  addLanguage() {
    let language = this.supportedLanguages.find(language => language.languageCode === this.addedLanguage);
    if(language) {
      console.log('Language is already supported.');
      return;
    }
    language = this.languages.find(language => language.languageCode === this.addedLanguage);
    this.supportedLanguages.push(language);
    let newTranslation = new ItemTranslations('','', language.languageCode);
    this.item.translations.push(newTranslation);
  }

  addIngredientGroup() {
    this.item.ingredientGroups.push(
      new IngredientGroup('', [], 1, 1, this.item.ingredientGroups.length + 1, new Ingredient('', false, 0, 1)));
  }

  addIngredient(ingredientGroup: IngredientGroup, ingredient: Ingredient) {
    ingredientGroup.ingredients.push(new Ingredient(ingredient.name, ingredient.addByDefault, ingredient.price, ingredient.allowQuantity));
    ingredient.name = '';
  }

  removeIngredient(ingredientGroup: IngredientGroup, ingredient: Ingredient) {
    ingredientGroup.ingredients.splice(ingredientGroup.ingredients.indexOf(ingredient), 1);
  }

  removeIngredientGroup(ingredientGroup: IngredientGroup) {
    let removeIndex = this.item.ingredientGroups.indexOf(ingredientGroup);
    this.item.ingredientGroups.splice(removeIndex, 1);
    for (let i = removeIndex; i < this.item.ingredientGroups.length; i++) {
      this.item.ingredientGroups[i].orderPriority = i + 1;
    }
  }

  removeLanguage(language: Language) {
    if (this.supportedLanguages.length < 1) {
      console.log('At least one language is required.');
    }
    let i = this.supportedLanguages.indexOf(language);
    this.supportedLanguages.splice(i, 1);
    let removedTranslation = this.item.translations.find(translation =>
      translation.languageCode === language.languageCode);
    let j = this.item.translations.indexOf(removedTranslation);
    this.item.translations.splice(j, 1);
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

enum PictureMode {
  Select,
  Edit,
  Crop,
  CropSelected
}
