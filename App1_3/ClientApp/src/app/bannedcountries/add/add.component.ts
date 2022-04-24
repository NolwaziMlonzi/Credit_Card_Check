import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bannedcountry } from '../bannedcountry';
import { BannedcountriesService } from "../bannedcountries.service";
import * as _ from 'lodash';
import $ from 'jquery';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  countries: Bannedcountry[] = [];
  Bannedcountries = new Set();
  createForm;

  constructor(
    public bannedCountryService: BannedcountriesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm = this.formBuilder.group({
      contryId: ['', Validators.required],
      flag: [''],
      countryName: ['']
    });
  }
  ngOnInit() {
    this.getBannedList();
    this.getCountries();
    
  }
  /**
   * Get List of Banned countries and assign to Bannedcountries Set.
   *
   **/
  getBannedList() {
    this.bannedCountryService.getBannedCoutries().subscribe((data: Bannedcountry[]) => {
      var results = _.map(data, function (result) {
        return result.countryName;
      });
      this.Bannedcountries = new Set(results);
    });
  }

  /**
   * get countries and assign to countries variable
   * sort list in ascending order
   */
  getCountries() {
    var self = this;
    this.bannedCountryService.getCoutries().subscribe((data: Bannedcountry[]) => {
      var index = 0;
      var newList  = _.sortBy(_.map(data, function (country) {
        index += 1;
        return { contryId: index, countryName: country["name"]["common"], flag: country["flags"]["png"] };
      }),
        [function (countries) {
          return countries.countryName;
        }]);
      this.countries = _.filter(newList, function (country) {
        if (!self.Bannedcountries.has(country.countryName)) return true;

      });
    });
  }

  /**
   * get data values of the country that should be added to the banned list.
   * @param data
   */
  getValues(data) {
    var list = _.filter(this.countries, function (country) {
     
      return country.contryId == data.contryId;
    });
    return _.get(list, "[0]", []);
    
  }

  /**
   * called on add form submisson with formData containing the country ID and name.
   * @param formData
   */
  onSubmit(formData) {
    var data = this.getValues(formData.value);
    this.bannedCountryService.BanCountry(data).subscribe(res => {
      if (formData.errors && !res) {
        alert("Country" + data.countryName +"  ban attempt Failed!");
      }
      else {
        alert("Country " + data.countryName +" was Successfully banned!");
      }
      this.router.navigateByUrl('bannedcountries/list');
    });
  }
}
