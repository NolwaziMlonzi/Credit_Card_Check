import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { ValidateComponent } from './validate/validate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ValidateComponent],
  imports: [
    CommonModule,
    CardRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CardModule { }
