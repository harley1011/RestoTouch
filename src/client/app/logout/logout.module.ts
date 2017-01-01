import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout.component';
import { FormsModule } from '@angular/forms';
import { LogoutRoutingModule } from './logout-routing.module';
import { TranslateModule } from 'ng2-translate';

@NgModule({
   imports: [CommonModule, RouterModule, FormsModule, LogoutRoutingModule, TranslateModule],
   declarations: [LogoutComponent],
   exports: [LogoutComponent]
})
export class LogoutModule { }
