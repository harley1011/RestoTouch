import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
  selector: 'category-cmp',
  templateUrl: 'category.component.html'
})

export class CategoryComponent implements OnInit {
    isEditable: boolean;

    ngOnInit(): void {
        this.isEditable = false;
    }
    changeInput(): void {
        if(this.isEditable === false) {
            this.isEditable = true;
        } else {
            this.isEditable = false;
        }
    }
}
