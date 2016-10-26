import { Component } from '@angular/core';
import { HomeService } from './home.service';
//import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: 'home.component.html',
    providers: [HomeService]
})

export class HomeComponent {}
