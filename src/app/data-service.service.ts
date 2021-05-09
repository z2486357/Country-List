import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {
  allCountryData: any;
  page = 1;
  topDown = 0;
  notfound = false;
  backFromDetail = false;
  constructor(private http: HttpClient) { }

  getAllCountry() {
    this.http.get("https://restcountries.eu/rest/v2/all").subscribe(
      (response) => {
        this.notfound = false;
        this.topDown = 0;
        this.allCountryData = response;
      },
      (error) => {
        this.notfound = true;
      })
  }

  getSearchCountry(input: string) {
    this.http.get("https://restcountries.eu/rest/v2/name/" + input).subscribe(
      (response) => {
        this.notfound = false;
        this.allCountryData = response;
      },
      (error) => {
        this.notfound = true;
      })
  }
}
