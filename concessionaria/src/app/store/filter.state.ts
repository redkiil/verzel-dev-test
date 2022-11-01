import { state } from "@angular/animations";
import { createAction, createReducer, on, props } from "@ngrx/store";
import { concat, filter } from "rxjs";
import { Vehicle } from "../models/Vehicle";

export interface filterStateVal {
    query: string,
    value: string
}
export interface orderParameters {
    by: string,
    order: string
}
export interface filterState {
    filter: filterStateVal[],
    vehicles: Vehicle[],
    order: orderParameters
}
const orderInitial: orderParameters = {
    by: 'Price',
    order: 'ASC'
}
export const filterInitialState: filterState = {
    filter: [],
    vehicles: [],
    order: orderInitial
}


export const addFilter = createAction('[Filter] Add filter parameters', props<{ payload: filterStateVal[] }>());
export const removeFilter = createAction('[Filter] Remove filter parameters', props<{ payload:  filterStateVal[] }>());
export const clearFilter = createAction('[Filter] Clear filter parameters');



export const setOrderParameters = createAction('[Order By] Order parameters', props<{ payload: orderParameters }>());


export const loadVehicles = createAction('[Vehicles] Load all vehicles based on filter');
export const setVehicles = createAction('[Vehicles] Set vehicles', props<{ payload: Vehicle[] }>());
export const loadVehiclesSuccess = createAction('[Vehicles] Load all vehicles sucess');

export const filterReducer = createReducer(
    filterInitialState,
    on(addFilter, (state, { payload }) => {
        let arr = [...JSON.parse(JSON.stringify(state.filter))] as filterStateVal[]
        if(!arr.length){
            arr = payload
        }else{
            payload.forEach((e) => {
                if(e.query == "min" || e.query == "max")
                {
                    let had = arr.findIndex((r) => r.query == e.query)
                    if(had == -1){
                        arr = arr.concat(e)
                    }else{
                        arr[had] = e;
                    }
                }else{
                    arr = arr.concat(e)
                }
                
            })
        }
        state = {
            ...state,
            filter: arr
        }
        return state;
    }),
    on(removeFilter, (state, { payload }) => {
        let arr = [...JSON.parse(JSON.stringify(state.filter))] as filterStateVal[]
        if(payload[0].query == "min" || payload[0].query == "max")
        {
            arr = state.filter.filter((r) => r.query != payload[0].query)
        }else{
            arr = state.filter.filter((r) => r.value != payload[0].value)
        }
        state = {
            ...state,
            filter: arr
        }
        return state;
    }),on(clearFilter, (state) => {
        state = {
            ...state, 
            filter: []
        }
        return state;
    }),on(setVehicles, (state, { payload }) => {
        state = {
            ...state, 
            vehicles: payload
        }
        return state;
    }),on(setOrderParameters, (state, { payload }) => {
        state = {
            ...state,
            order: payload
        }
        return state;
    })
)