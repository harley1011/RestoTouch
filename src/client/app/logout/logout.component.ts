import {Component, OnInit} from '@angular/core';

import {User} from '../shared/models/user';
import {AuthService}       from '../services/auth.service';
import {Router} from '@angular/router';

/**
 *  This class represents the lazy loaded LoginComponent.
 */

@Component({
  moduleId: module.id,
  selector: 'logout-cmp',
  templateUrl: 'logout.component.html'
})

export class LogoutComponent implements OnInit {
  user = new User('', '');
  errorMessage = '';

  constructor(private authService: AuthService,
              private router: Router) {}

    ngOnInit(): void {
        this.authService.logout();
    }

  onSubmit() {
    /*this.authService.authenticateUser(this.user)
      .subscribe(generalResponse =>
          this.router.navigate(['/dashboard/home'])
        , error => this.errorMessage = error);*/
  }
}
