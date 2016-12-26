import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: LoginComponent }
      /* define app module routes here, e.g., to lazily load a module
       (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
    ])
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
