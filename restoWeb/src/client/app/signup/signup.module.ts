import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import {TranslateModule} from 'ng2-translate';
import { SignupRoutingModule } from './signup-routing.module';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, SignupRoutingModule, TranslateModule],
    declarations: [SignupComponent],
    exports: [SignupComponent]
})

export class SignupModule { }
