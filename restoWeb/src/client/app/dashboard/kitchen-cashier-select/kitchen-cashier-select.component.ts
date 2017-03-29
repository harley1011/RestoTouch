import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'kitchen-cashier-select-cmp',
  templateUrl: 'kitchen-cashier-select.component.html',
  providers: []
})

export class KitchenCashierSelectComponent implements OnInit {

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

	kitchenSelect(): void {
      this.router.navigate(['/dashboard/kitchen', this.id]);
  	}

  	cashierSelect(): void {
      this.router.navigate(['/dashboard/unpaidOrders', this.id]);
  	}
}