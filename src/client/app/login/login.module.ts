import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from 'ng2-translate';

@NgModule({
   imports: [CommonModule, RouterModule, FormsModule,TranslateModule],
   declarations: [LoginComponent],
   exports: [LoginComponent]
})
export class LoginModule { }
