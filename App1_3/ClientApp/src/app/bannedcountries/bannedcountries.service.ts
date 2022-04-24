import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bannedcountry } from "./bannedcountry";

@Injectable({
  providedIn: 'root'
})
export class BannedcountriesService {
  private apiURL = "";
  private extApiURL = "https://restcountries.com/v3.1/all";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.apiURL = baseUrl; }

  /**
   *
   * this method makes api call to get banned countries.
   *
   **/
  getBannedCoutries(): Observable<Bannedcountry[]> {
    return this.httpClient.get<Bannedcountry[]>(this.apiURL + 'api/Bannedcontries')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   *
   * this method makes an external api call to get list of all countries.
   * 
   **/
  getCoutries(): Observable<Bannedcountry[]> {
    return this.httpClient.get<Bannedcountry[]>(this.extApiURL)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * this method add country to the banned list.
   * @param Country
   */
  BanCountry(Country): Observable<Bannedcountry> {
    return this.httpClient.post<Bannedcountry>(this.apiURL + 'api/Bannedcontries/', JSON.stringify(Country), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * 
   * this method removes country from the bunned list.
   * @param id
   */
  UnbanCountry(id) {
    return this.httpClient.delete<Bannedcountry>(this.apiURL + 'api/Bannedcontries/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * 
   * get country details of the given Country Id.
   * @param CountryId
   */
  getBannedcountry(CountryId): Observable<Bannedcountry> {
    return this.httpClient.get<Bannedcountry>(this.apiURL + 'api/Bannedcontries/' + CountryId)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  /**
   * 
   * this method is called when there's an exception.
   * configures and throws an error message.
   * 
   * @param error
   */
  errorHandler(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
