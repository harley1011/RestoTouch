import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from './profile.service';
import {User} from '../../shared/models/user';

@Component({
  moduleId: module.id,
  selector: 'profile-cmp',
  templateUrl: 'profile.component.html',
  providers: [ProfileService]
})

export class ProfileComponent {
	user = new User('', '');
	editing: boolean;

	constructor(private profileService: ProfileService,
				private router: Router) {
		this.profileService.getProfile().subscribe(user => {
			this.user = user;
			console.log(user);
		});
		this.editing = false;
	}

	edit() {
		this.editing = !this.editing;
	}

	cancel() {
		//Could maybe be improved
		this.profileService.getProfile().subscribe(user => {
			this.user = user;
			console.log(user);
		});
		this.editing = false;
	}
}
