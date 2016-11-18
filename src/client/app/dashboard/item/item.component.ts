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
  cropperSettings: CropperSettings;
  name: string;
  croppedImageContainer: any;
  croppedImage: any = 'assets/img/default-placeholder.png';
  pictureMode: PictureMode = PictureMode.Select;
  pictureModes = PictureMode;

  @ViewChild(ImageCropperComponent) cropper: ImageCropperComponent;

  constructor(private itemService: ItemService,
              private router: Router,
              private route: ActivatedRoute,
              private element: ElementRef,
              private imageUploadService: ImageUploadService) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;

    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 300;

    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 300;

    this.cropperSettings.minWidth = 100;
    this.cropperSettings.minHeight = 100;

    this.cropperSettings.rounded = false;

    this.cropperSettings.noFileInput = true;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.croppedImageContainer = {};
  }

  cropped(bounds: Bounds) {
    console.log(bounds);
    console.log(this.croppedImageContainer);
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        this.itemService.getItem(params['id']).subscribe(item => {
          this.item = item;
          this.create = false;
          this.croppedImage = item.imageUrl;
          this.pictureMode = PictureMode.Edit;
        }, error => {
          console.log(error);
        });
      } else {
        this.item = new Item('', '', '', []);
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
  }

  onProgress(progress: number) {
    console.log(progress);
  }

  onSubmit() {
    if (this.create) {
      var imageSelector = this.element.nativeElement.querySelector('.item-image-select').files[0];
      this.imageUploadService.getS3Key(imageSelector.name, imageSelector.type).subscribe((response) => {
        let finished: boolean = false;
        this.item.imageUrl = response.url;
        this.itemService.addItem(this.item).subscribe(
          generalResponse => {
            if (finished) {
              this.router.navigate(['/dashboard/items']);
            } else {
              finished = true;
            }

          },
          error => {
            this.errorMessage = <any> error;
          });

        this.imageUploadService.uploadImage(response.url, response.signedRequest,
          this.croppedImageContainer.image, this.onProgress, (): void => {
            if (finished) {
              this.router.navigate(['/dashboard/items']);
            } else {
              finished = true;
            }
          });

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

enum PictureMode {
  Select,
  Edit,
  Crop,
  CropSelected
}
