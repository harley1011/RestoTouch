import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {FormsModule} from '@angular/forms';
import {AlertModule} from 'ng2-bootstrap/alert';

@NgModule({
  imports: [CommonModule, FormsModule, AlertModule.forRoot()],
  declarations: [ProfileComponent],
  exports: [ProfileComponent]
})

export class ProfileModule {
}
