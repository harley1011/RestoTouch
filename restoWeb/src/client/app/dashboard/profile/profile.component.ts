import {Component} from '@angular/core';
import {AccountSettingsService} from '../settings/account-settings.service';


@Component({
  moduleId: module.id,
  selector: 'profile-cmp',
  templateUrl: 'profile.component.html',
  providers: [AccountSettingsService]
})

export class ProfileComponent {}
