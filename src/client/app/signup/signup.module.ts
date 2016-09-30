import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [SignupComponent],
    exports: [SignupComponent]
})

export class SignupModule { }
