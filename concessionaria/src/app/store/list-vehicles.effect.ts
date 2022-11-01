import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import { VehiclesService } from '../services/vehicles.service';
import { addFilter, clearFilter, filterState, loadVehicles, loadVehiclesSuccess, removeFilter, setOrderParameters, setVehicles } from './filter.state';

@Injectable({
  providedIn: 'root'
})
export class ListVehiclesEffect {

  constructor(private actions$: Actions, private service: VehiclesService, private store: Store<{ app: filterState}>) { }

  loadVehicles = createEffect(() => 
    this.actions$.pipe(
      ofType(loadVehicles, addFilter, removeFilter, setOrderParameters, clearFilter),
      withLatestFrom(this.store.select('app').pipe(map(e => e))),
      switchMap(([ _, data ]) => 
        this.service.getAllVehicles(data.filter, data.order)
      ),tap(vehicles => this.store.dispatch(setVehicles({ payload: vehicles  }))),
      map(() => loadVehiclesSuccess())
    )
  )
  
}
