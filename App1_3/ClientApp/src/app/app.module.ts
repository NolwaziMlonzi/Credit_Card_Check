import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { BannedcountriesModule } from './bannedcountries/bannedcountries.module';
import { ListComponent } from "./bannedcountries/list/list.component";

import { CardModule } from './card/card.module';
import { ValidateComponent } from "./card/validate/validate.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BannedcountriesModule,
    CardModule,
    RouterModule.forRoot([
      { path: '', component: ValidateComponent, pathMatch: 'full' },
      { path: 'bannedcountries', component: ListComponent },
      { path: 'card', component: ValidateComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
