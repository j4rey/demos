import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-of',
  templateUrl: './of.component.html',
  styleUrls: ['./of.component.css']
})
export class OfComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  EmitSequenceOfNumbers() {
    const observable$ = of(1, 2, 3, 4, 5);
    const subscribe = observable$.subscribe(val => console.log(val));
  }

  EmitObjectArrayFunction() {
    const observable$ = of(
                          { Name: 'SomeName' }, //Object
                          [5, 6, 7, 8, 9], //Array
                          function hello() { console.log('Hello') } //function
                        );
    const subscribe = observable$.subscribe(val => console.log(val))
  }
}
