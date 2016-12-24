import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule,TranslateModule],
    declarations: [SignupComponent],
    exports: [SignupComponent]
})

export class SignupModule { }
