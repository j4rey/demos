import { startWith } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { of, interval } from 'rxjs';

@Component({
  selector: 'app-startwith',
  templateUrl: './startwith.component.html',
  styleUrls: ['./startwith.component.css']
})
export class StartwithComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  startWithNumberSequence() {
    const source = of(1,2,3);
    const example = source.pipe(startWith(0));
    const subscribe = example.subscribe(val=> console.log(val));
  }

  startWithMultiple() {
    const source = interval(1000);
    const example = source.pipe(startWith(-3,-2,-1,));
    const subscribe = example.subscribe(val => console.log(val));
  }
}
