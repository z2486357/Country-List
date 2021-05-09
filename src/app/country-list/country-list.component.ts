import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  get allCountryData() { return this.dataService.allCountryData }
  get page() { return this.dataService.page }
  get displayCountryData() { return this.allCountryData.slice((this.page - 1) * 25, (this.page - 1) * 25 + 25) }
  get total_pages() { return Math.ceil(this.allCountryData.length / 25) }
  get notfound() { return this.dataService.notfound }
  searchInput: string;
  pageChange: number;
  isSearch = false;
  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.dataService.backFromDetail == false) { this.dataService.getAllCountry(); }
  }

  gotoDetail(index: number) {
    this.router.navigate(['/' + index]);
  }

  sortList(input) {
    if (input == "0") {
      if (this.isSearch) {
        this.allCountryData.sort((a, b) => (a.name > b.name) ? 1 : -1); //consideing search function api, this would be better when searching
      } else {
        if (this.dataService.topDown == 1) {
          this.switchTopDown();
          this.dataService.topDown = 0;
        }
      }
    }
    if (input == "1") {
      if (this.isSearch) {
        this.allCountryData.sort((a, b) => (a.name < b.name) ? 1 : -1); //consideing search function api, this would be better when searching
      } else {
        if (this.dataService.topDown == 0) {
          this.switchTopDown();
          this.dataService.topDown = 1;
        }
      }
    }
    this.dataService.page = 1;
  }

  switchTopDown() {
    for (let i = 0; i < this.allCountryData.length / 2; i++) {
      let tmp = this.allCountryData[i];
      this.allCountryData[i] = this.allCountryData[this.allCountryData.length - 1 - i];
      this.allCountryData[this.allCountryData.length - 1 - i] = tmp;
    }
  }

  search() {
    if (this.searchInput) {
      this.isSearch = true;
      this.dataService.getSearchCountry(this.searchInput);
    } else {
      this.isSearch = false;
      this.dataService.getAllCountry();
    }
    this.dataService.page = 1;
  }

  nextPage(pageNo: number) {
    if (isNaN(pageNo)) {
      this.pageChange = this.page;
      return
    }
    if (pageNo < 1 || pageNo > this.total_pages) {
      this.pageChange = this.page;
      return
    }
    this.dataService.page = pageNo;
  }

}
