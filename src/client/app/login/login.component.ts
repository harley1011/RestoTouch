import { Component } from '@angular/core';

import { User } from '../shared/models/user';
import { AuthService }       from '../services/auth.service';
import { Router } from '@angular/router';

/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'login-cmp',
	templateUrl: 'login.component.html',
	providers: [ AuthService ]
})

export class LoginComponent {
	user = new User('', '');
	errorMessage: string;

	constructor (private authService: AuthService,
				private router: Router,) {}

	onSubmit() {
		this.authService.authenticateUser(this.user)
                        .subscribe(generalResponse => {
				            console.log(generalResponse);
                            this.router.navigate(['/dashboard/home']);
				        }, error =>  this.errorMessage = <any>error);
    }
}
