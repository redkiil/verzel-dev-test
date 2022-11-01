import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { filterState, removeFilter } from '../store/filter.state';

@Directive({
  selector: '[delFilterButton]'
})
export class FilterButtonDelDirective {

  @Input('delFilterButton') query: string = '';

  constructor(private el: ElementRef, private store: Store<{ app: filterState}>) { }

  
  @HostListener('click', ['$event.target'])
  onClick() {
    let value = this.el.nativeElement.innerText;
    this.store.dispatch(removeFilter({payload: [{ query: this.query, value: value }]}));

  }

}
