import {Component, OnInit, ElementRef} from '@angular/core';
import {Item} from './../../shared/models/items';
import {Size} from './../../shared/models/size';
import {ItemService} from './item.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ImageUploadService} from '../../services/image-upload.service';


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

  constructor(private itemService: ItemService,
              private router: Router,
              private route: ActivatedRoute,
              private element: ElementRef,
              private imageUploadService: ImageUploadService) {
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
        this.item = new Item('', '', 'assets/img/default-placeholder.png', []);
        this.create = true;
      }
    });
  }

  selectFile() {
    var imageSelector = this.element.nativeElement.querySelector('.item-image-select');
    imageSelector.click();
    console.log(imageSelector);
  }

  onChange(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      var image = this.element.nativeElement.querySelector('.item-image-upload');
      reader.onload = function (e) {
        //noinspection TypeScriptUnresolvedVariable
        var src = e.target.result;
        image.src = src;
      };

      reader.readAsDataURL(fileInput.target.files[0]);

      var images = this.element.nativeElement.querySelector('.item-image-select').files;
      var imageSelect = images[0];
      this.imageUploadService.getS3Key(imageSelect.name, imageSelect.type).subscribe((response) => {
        this.imageUploadService.uploadImage(response.url, response.signedRequest, imageSelect, this.onProgress, (): void => {
          this.item.imageUrl = response.url;
        });
      });
    }
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
