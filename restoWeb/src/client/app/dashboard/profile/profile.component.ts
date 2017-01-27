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
	passChange: boolean = false;
	hideMessageSuccess: boolean;

	constructor(private profileService: ProfileService,
				private router: Router) {
		this.profileService.getProfile().subscribe(user => {
			this.user = user;
			console.log(user);
		});
		this.editing = false;
		this.hideMessageSuccess = true;
	}

	edit() {
		this.editing = !this.editing;
		this.hideMessageSuccess = true;
	}

	changePass() {
		this.passChange = !this.passChange;
		this.user.password = "";
	}

	save() {
		this.profileService.saveProfile(this.user).subscribe(
      		generalResponse => {
        		this.router.navigate(['/dashboard/profile']);
      	});
      	this.editing = false;
      	this.hideMessageSuccess = false;
	}

	cancel() {
		//Could maybe be improved
		this.editing = false;
		this.hideMessageSuccess = true;
		this.profileService.getProfile().subscribe(user => {
			this.user = user;
			console.log(user);
		});
	}
}
