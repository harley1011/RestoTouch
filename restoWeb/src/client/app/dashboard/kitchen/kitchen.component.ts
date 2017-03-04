import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'kitchen-cmp',
  templateUrl: 'kitchen.component.html',
  providers: []
})

export class KitchenComponent implements OnInit {

	id: number;

	constructor(private router: Router,
				private route: ActivatedRoute,
				private translate: TranslateService) {

	}

	ngOnInit() : void {
		this.route.params.forEach((params: Params) => {
        if (params['id']) {
        	this.id = params['id'];
        }
    });
	}
}