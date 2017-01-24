import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})

export class ProfileModule {
}
