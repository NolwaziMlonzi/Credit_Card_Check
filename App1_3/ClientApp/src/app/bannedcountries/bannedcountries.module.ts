import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannedcountriesRoutingModule } from './bannedcountries-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    BannedcountriesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BannedcountriesModule { }
