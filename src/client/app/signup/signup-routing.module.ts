import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './index';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'signup', component: SignupComponent }
    ])
  ],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
