import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Item} from './../../shared/models/items';
import {Size} from './../../shared/models/size';
import {ItemService} from './item.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ImageUploadService} from '../../services/image-upload.service';
import {CropperSettings} from 'ng2-img-cropper/src/cropperSettings';
import {Bounds} from 'ng2-img-cropper/src/model/bounds';
import {ImageCropperComponent} from 'ng2-img-cropper/src/imageCropperComponent';

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
  cropperSettings1: CropperSettings;
  name: string;
  data1: any;
  pictureSelected: boolean = false;
  pictureCroppedSelect: boolean = false;

  @ViewChild(ImageCropperComponent) cropper: ImageCropperComponent;

  constructor(private itemService: ItemService,
              private router: Router,
              private route: ActivatedRoute,
              private element: ElementRef,
              private imageUploadService: ImageUploadService) {

    this.name = 'Angular2';
    this.cropperSettings1 = new CropperSettings();
    this.cropperSettings1.width = 200;
    this.cropperSettings1.height = 200;

    this.cropperSettings1.croppedWidth = 300;
    this.cropperSettings1.croppedHeight = 300;

    this.cropperSettings1.canvasWidth = 300;
    this.cropperSettings1.canvasHeight = 300;

    this.cropperSettings1.minWidth = 100;
    this.cropperSettings1.minHeight = 100;

    this.cropperSettings1.rounded = false;

    this.cropperSettings1.noFileInput = true;

    this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;
    this.data1 = {};
  }

  cropped(bounds: Bounds) {
    console.log(bounds);
    console.log(this.data1);
  }

  selectCroppedImage() {
    this.pictureCroppedSelect = !this.pictureCroppedSelect;

    // var imageSelector = this.element.nativeElement.querySelector('.item-image-select').files[0];
    // this.imageUploadService.getS3Key(imageSelector.name, imageSelector.type).subscribe((response) => {
    //   this.imageUploadService.uploadImage(response.url, response.signedRequest,
    //     this.data1.image, this.onProgress, (): void => {
    //       this.item.imageUrl = response.url;
    //     });
    // });
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        this.itemService.getItem(params['id']).subscribe(item => {
          this.item = item;
          this.create = false;
        }, error => {
          console.log(error);
        });
      } else {
        this.item = new Item('', '', '', []);
        this.create = true;
      }
    });
  }

  selectFile() {
    if (this.pictureSelected) {
      this.pictureCroppedSelect = !this.pictureCroppedSelect;
    } else {
      var imageSelector = this.element.nativeElement.querySelector('.item-image-select');
      imageSelector.click();
      this.pictureSelected = true;
    }
  }

  onChange(fileInput) {
    this.cropper.fileChangeListener(fileInput);
    console.log(this.data1);

    // var reader = new FileReader();
    var imageSelector = this.element.nativeElement.querySelector('.item-image-select').files[0];
    console.log(imageSelector);

    // reader.addEventListener('load', function () {
    //
    // }, false);

    //reader.readAsDataURL(this.data1.image);



  }

  onProgress(progress: number) {
    console.log(progress);
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
