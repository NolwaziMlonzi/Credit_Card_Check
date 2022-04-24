import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: 'bannedcountries', redirectTo: 'bannedcountries/list', pathMatch: 'full' },
  { path: 'bannedcountries/list', component: ListComponent },
  { path: 'bannedcountries/:countryId/edit', component: EditComponent },
  { path: 'bannedcountries/create', component: AddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannedcountriesRoutingModule { }
