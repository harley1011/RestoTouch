import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';

import {TranslateModule} from 'ng2-translate';

@NgModule({
   imports: [CommonModule, RouterModule, FormsModule,TranslateModule, LoginRoutingModule],
   declarations: [LoginComponent],
   exports: [LoginComponent]
})
export class LoginModule { }
