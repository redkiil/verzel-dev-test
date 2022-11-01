import { Component, OnInit } from '@angular/core';
import { Filter } from '../../models/Filter';
import { FilterService } from '../../services/filter.service';
import { addFilter, clearFilter, filterState, filterStateVal, loadVehicles, orderParameters, setOrderParameters } from '../../store/filter.state';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Options } from '@angular-slider/ngx-slider';
import { environment } from '../../../environments/environment';
import { UserService } from 'src/app/services/user.service';
import { Vehicle } from 'src/app/models/Vehicle';


@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.css']
})
export class ListVehiclesComponent implements OnInit {

  constructor(private FilterService: FilterService, private store: Store<{ app: filterState}>, private userService: UserService) {}
  
  priceValue: number = 40;
  priceHighValue: number = 60;
  priceOptions: Options = {
    floor: 0,
    ceil: 0
  };


  allVehicles$?: Observable<Vehicle[]>;
  filterValues$?: Observable<filterStateVal[]>;
  numberResults$?: any;
  filter?: Filter;
  toogleFilter: boolean = true;
  apiUrl = environment.apiUrl;
  orderMenu: boolean = false;
  orderMenuCurValue: string = 'Maior preço';

  ngOnInit(): void {
    this.FilterService.getFilterValues().subscribe(result => {
      this.filter = result;
      this.store.dispatch(loadVehicles());
      this.priceOptions = { ...this.priceOptions, ceil: this.filter.max, floor: this.filter.min}
      this.priceValue = this.filter?.min || 1;
      this.priceHighValue = this.filter?.max || 1000;
    })
    this.allVehicles$ = this.store.select('app').pipe(map(e => e.vehicles));
    this.filterValues$ = this.store.select('app').pipe(map(e => e.filter));
    this.numberResults$ = this.allVehicles$.pipe(map(e => e.length));
  }
  updatePriceRange() {
    this.store.dispatch(addFilter({payload: [ { query: "max", value: this.priceHighValue.toString() }, { query: "min", value: this.priceValue.toString() }]}));
  }
  clearFilterParameters(){
    this.store.dispatch(clearFilter());
  }
  updateOrderState(order:orderParameters, orderName: string)
  {
    this.orderMenuCurValue = orderName;
    this.store.dispatch(setOrderParameters({payload: order}));
  }
  isLoggedIn(): boolean {
    return this.userService.isAuthenticated();
  }
}
