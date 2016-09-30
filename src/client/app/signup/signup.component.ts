import { Component } from '@angular/core';

import { User } from './user';
import { UserService }       from './user.service';
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

  constructor (private userService: UserService) {}

  onSubmit() {
    this.userService.registerUser(this.user)
                      .subscribe(
                        user => this.user = user,
                        error =>  this.errorMessage = <any>error);

  }

}
