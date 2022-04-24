import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateComponent } from './validate/validate.component';

const routes: Routes = [
  { path: 'card', redirectTo: 'card/validate', pathMatch: 'full' },
  { path: 'card/validate', component: ValidateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }
