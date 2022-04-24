# Credit Card Check
![image](https://user-images.githubusercontent.com/51321368/164993205-4dc02995-0f2d-49d7-965f-e562eb51d1e3.png)
## Introduction

> This Application allows users to submit a bunch of credit card  including country that it is from and card
numbers for validation.
It also checks the specified country to make sure it doesn’t exist in a list of banned countries and ensure the list is configurable.

>It also stores valid cards for the session and display all credit cards that have been captured during the session whilist ensuring the same card number is not captured twice.

## Code Samples


  <pre>
/**
   * called on edit form submit with form data containing details of the country that should be unbanned.
   * notify user if country remove attempt was successful of not.
   * reroute to the country banned list.
   * @param formData
**/

  onSubmit(formData) {
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
</pre>

## Installation

> 1 Clone the <a href="https://github.com/NolwaziMlonzi/Credit_Card_Check">Credit Card Check </a>Project.

> NB:Ensure mysql connector for VS is install,alternitively visit <a href="https://dev.mysql.com/downloads/connector/net/8.0.html">MySQL Connector</a>.

>  2 Build the Solution.

>3 Run project.
