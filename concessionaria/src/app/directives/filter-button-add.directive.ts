import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { addFilter, filterState } from '../store/filter.state';

@Directive({
  selector: '[addFilterButton]'
})
export class FilterButtonAddDirective {

  @Input('addFilterButton') query: string = '';

  constructor(private el: ElementRef, private store: Store<{ app: filterState}>) { }

  
  @HostListener('click', ['$event.target'])
  onClick() {
    let value = this.el.nativeElement.innerText;
    this.store.dispatch(addFilter({payload: [{ query: this.query, value: value }]}));
  }

}
