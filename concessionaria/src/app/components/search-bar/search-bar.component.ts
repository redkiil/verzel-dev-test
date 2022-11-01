import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }
  searchVehicle(event: any) {
    let searchValue:string = event.target.value;

  }
}
