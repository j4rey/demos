import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  FilterEvenNumbers(){
    const source = from([1,2,3,4,5]);
    const observable$ = source.pipe(filter(x=>x%2==0))
    .subscribe(x=>console.log(`Even: ${x}`));
  }

  FilterObjectProperty(){
    const source = from([{name: 'Alpha'},{name: 'Beta'}]);
    const observable$ = source.pipe(filter(obj=> obj.name === 'Beta'))
    .subscribe(x=>console.log(`Name: ${x.name}`));
  }
}
