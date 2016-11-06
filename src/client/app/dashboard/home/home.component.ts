import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/models/user';

//import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: 'home.component.html',
    providers: [HomeService]
})

export class HomeComponent implements OnInit {
    user: User;

    constructor(private authService: AuthService) {}
    ngOnInit() {
            this.user = this.authService.loggedInUser;
    }
}
