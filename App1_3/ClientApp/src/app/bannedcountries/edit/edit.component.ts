import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bannedcountry } from '../bannedcountry';
import { BannedcountriesService } from "../bannedcountries.service";
import * as _ from 'lodash';
import $ from 'jquery';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  contryId: number;
  editForm;

  constructor(
    public bannedCountryService: BannedcountriesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      contryId: [''],
      flag: [''],
      countryName: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getId();
    this.getCountryDetails();
  }

  /**
   * gets Id for the selected country and assign to contryId variable.
   *
   */
  getId() {
    this.contryId = this.route.snapshot.params['countryId'];
  }

  /**
   * 
   * get country details of the given Id.
   * put details in the edit form.
   * 
   */
  getCountryDetails() {

    this.bannedCountryService.getBannedcountry(this.contryId).subscribe((data: Bannedcountry) => {
      this.editForm.patchValue(data);
    });
  }

  /**
   * 
   * called on edit form submit with form data containing details of the country that should be unbanned.
   * notify user if country unban attemp was successful of not.
   * rerout to the country banned list.
   * 
   * @param formData
   */
  onSubmit(formData) {
    console.log("unban details ",formData)
    this.bannedCountryService.UnbanCountry(formData.value.contryId).subscribe(res => {
      if (formData.errors && !res) {
        alert("Country" + formData.value.countryName + "  Unban attempt Failed!");
      }
      else {
        alert("Country " + formData.value.countryName + " was Successfully Unbanned!");
      }
      this.router.navigateByUrl('bannedcountries/list');
    });
  }
}
