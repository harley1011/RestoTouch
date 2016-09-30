import { Component } from '@angular/core';

import { User } from './user';
import { UserService }       from './user.service';
import { Router } from '@angular/router';

/**
*	This class represents the lazy loaded SignupComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'signup-cmp',
	templateUrl: 'signup.component.html',
  providers: [ UserService ]
})

export class SignupComponent {
  user = new User('', '', '', '', '');
  errorMessage: string;

  constructor (private userService: UserService,
               private router: Router,) {}

  onSubmit() {
     this.userService.registerUser(this.user)
                       .subscribe(
                         generalResponse => {console.log(generalResponse); this.router.navigate(['/dashboard/home']); },
                         error =>  this.errorMessage = <any>error);

  }

}
