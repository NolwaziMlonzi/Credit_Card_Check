import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Bannedcountry } from '../../bannedcountries/bannedcountry';
import { BannedcountriesService } from "../../bannedcountries/bannedcountries.service";
import * as _ from 'lodash';
import $ from 'jquery';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {
  countries
  Bannedcountries = new Set();
  cardDetails = [];
  submitForm
  constructor(
    public bannedCountryService: BannedcountriesService,
    private formBuilder: FormBuilder
  ) {
    this.submitForm = this.formBuilder.group({
      cardHolder: ['', Validators.required],
      cardNumber: ['', Validators.required],
      countryName:['', Validators.required],
      ExDate: ['', Validators.required],
      CardType: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.getBannedList();
    this.getCountries();
    this.getExistingSessionData();
  }

  /**
   * get banned country list and assign to a Bannedcountries Set
   *
   */
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
    this.bannedCountryService.getCoutries().subscribe((data: Bannedcountry[]) => {

      var index = 0;
      this.countries = _.sortBy(_.map(data, function (country) {
        index += 1;
        return { contryId: index, countryName: country["name"]["common"], flag: country["flags"]["png"] };
      }),
        [function (countries){
          return countries.countryName;
        }]);
    });
  }

  /**
   * 
   * clear fields aftercapturing card details
   */
  clearFields() {
    $("#inputCardHolder").val("");
    $("#inputCardNumber").val(""); 
    $("#Exdate").val("");
    let selectTags = document.getElementsByTagName("select");
    for (var i = 0; i < selectTags.length; i++) {
      selectTags[i].selectedIndex = 0;
    }
  }

  /**
   * show card with card details
   * @param cardDetails
   */
  showCard(cardDetails) {
   
    $("#add-card").css('display', 'none');
    $(".card-container").css('display', 'block');
    $("#number").text(cardDetails.cardNumber);
    $("#name").text(cardDetails.cardHolder);
    console.log("the date ", cardDetails)
    var exDate = cardDetails.ExDate.replace(/-/g, "/")
    $("#date").text(exDate);

    switch (cardDetails.CardType.toLowerCase()) {
      case "visa":
        $("#visa").css('display', 'block');
        $("#mastercard").css('display', 'none');
        $("#xpress").css('display', 'none');
        break;
      case "mastercard":
        $("#mastercard").css('display', 'block');
        $("#xpress").css('display', 'none');
        $("#visa").css('display', 'none');
        break;
      case "xpress":
        $("#xpress").css('display', 'block');
        $("#visa").css('display', 'none');
        $("#mastercard").css('display', 'none');
        break;
      default:
        $("#xpress").css('display', 'none');
        $("#visa").css('display', 'none');
        $("#mastercard").css('display', 'none');
    }

    $("#type").val(cardDetails.cardNumber);
  }

  /**
   * called on form submision and contains formData.
   * @param formData
   */
  validateCard(formData) {
   
    var validate = this.validateCardNumber(formData);
    validate ? this.checkCountryInBannedList(formData) : alert("Card Number Provided is Invalid! Please Try Again.");
  }

  /**
   * checks if country provided is not banned.
   * @param country
   */
  checkCountryInBannedList(country)
  {

    (this.Bannedcountries.has(country.value.countryName)) ? alert("Cannot Submit Card Details,Unfortunately " + country.value.countryName + " is Banned!") : this.sessionStorageData(country);
  
  }

  /**
   * gets form data in the sessionStorage.
   * check if card number in the newFormData alredy exist in the sessionStorage.
   * notifyuser if it exists.
   * add newFormData to the sessionStorage data.
   * @param data
   * @param newFormData
   */
  setSessionData(extistingSubmittedFormdata,newFormData) {
    try {
      let isFound = _.find(JSON.parse(window.sessionStorage.getItem("formData")), function (sessionData) {
        if (newFormData.cardNumber == sessionData.cardNumber) return true;
      });
      if (isFound) {
        alert("Card Number Has already Been Captured, Try a different Card Number");
        return false;
      }
      else {
        window.sessionStorage.setItem("formData", JSON.stringify(extistingSubmittedFormdata));
        this.getExistingSessionData();
        this.showCard(newFormData);
        this.clearFields();
        return true;
      }

    } catch (ex) {
      alert("error has occured " + ex.message);
      return false;
    }
  }

  /**
   * 
   * checks if there's any existing formData in the sessionStorage.
   * gets existing formData in the sessionStorage.
   * return existingData in the session if exists.
   * 
   */
  getSessionData() {
    let storedData = [];
    try {
      if (window.sessionStorage.getItem("formData")) storedData = JSON.parse(window.sessionStorage.getItem("formData"));
    
    } catch (ex) {
      alert("error has occured " + ex.message);
    }
    finally {
      return storedData;
    }
    
  }

  /**
   *
   * calls the getSessionData method that returns existing FormData and assigns to cardDetails.
   *
   */
  getExistingSessionData() {
    this.cardDetails = this.getSessionData();
  }

  /**
   * called by validateCard method if the country provided is not banned.
   * calls getSessionData() which will return existing formData in the sessionStorage.
   * append new submitted form Data to the existing formDatain thesessionStorage.
   * notify user that card details were captured successfull after setting new formData in the sessionStorage.
   * @param data
   */
  sessionStorageData(data) {
    let dataForm =  this.getSessionData();
    dataForm.push(data.value);
    
    if(this.setSessionData(dataForm,data.value)) alert("Card Details Successfully Submitted!");
  }

  /**
   * 
   * Checks iif card input contains numerics and the length is between 13 to 19
   * @param card
   */
  validateCardNumber(card) {
    try {
        const regex = new RegExp("^[0-9]{13,19}$");
        if (!regex.test(card.value.cardNumber)) {
          return false;
        }
        return this.doLuhnCheck(card.value.cardNumber);
      } catch (ex) {
        alert("error has occured " + ex.message);
      }
    }

  /**
   * validates the card number to see if it's valid or not.
   * @param cardNumberToValidate
   */
  doLuhnCheck(cardNumberToValidate) {
      let checkThesum = 0; // running checkThesum total
      let value = 1; // takes value of 1 or 2

      // Process each value starting from the last number
      for (let i = cardNumberToValidate.length - 1; i >= 0; i--) {
        let calculate = 0;
        // Extract the next value and multiply by 1 or 2 on alternative digits.
        calculate = Number(cardNumberToValidate.charAt(i)) * value;

        // If outcome is in two numbers add 1 to the checkThesum total
        if (calculate > 9) {
          checkThesum = checkThesum + 1;
          calculate = calculate - 10;
        }

        // Add units to the checkThesum total
        checkThesum = checkThesum + calculate;

        // Switch the value
        if (value == 1) {
          value = 2;
        } else {
          value = 1;
        }
      }

      //Check if divisible by 10.
      return (checkThesum % 10) == 0;
    }
 
}
