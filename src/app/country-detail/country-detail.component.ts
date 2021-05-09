import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  get displayDetail() { return this.dataService.allCountryData[((this.dataService.page - 1) * 25) + this.index] }
  index: number
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.index = parseInt(this.route.snapshot.paramMap.get('id'));
    this.dataService.backFromDetail = true;
  }

}
