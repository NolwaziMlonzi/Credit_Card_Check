import { Component, OnInit } from '@angular/core';
import { Bannedcountry } from '../bannedcountry';
import { BannedcountriesService } from "../bannedcountries.service";
import * as _ from 'lodash';
import $ from 'jquery';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  countries: Bannedcountry[] = [];

  constructor(public bannedCountryService: BannedcountriesService) { }

  ngOnInit() {
    this.getBannedList();
  }

  /**
   * 
   * get list of banned countries.
   * sort listof banned countries.
   * assign results to countries variable.
   * 
   **/
  getBannedList() {
    this.bannedCountryService.getBannedCoutries().subscribe((data: Bannedcountry[]) => {    
      var index = 0;
      this.countries = _.sortBy(data,
        [function (countries) {
          return countries.countryName;
        }]);
    });
  }
}
