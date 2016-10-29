import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout.component';
import { FormsModule } from '@angular/forms';

@NgModule({
   imports: [CommonModule, RouterModule, FormsModule],
   declarations: [LogoutComponent],
   exports: [LogoutComponent]
})
export class LogoutModule { }
