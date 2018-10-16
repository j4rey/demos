import { Component, OnInit } from '@angular/core';
import { interval, merge as StaticMerge } from 'rxjs';
import { mapTo, merge, map } from 'rxjs/operators';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  staticMerge() {
    //emit every 2.5 seconds
    const first = interval(2500);
    //emit every 2 seconds
    const second = interval(2000);
    //emit every 1.5 seconds
    const third = interval(1500);
    //emit every 1 second
    const fourth = interval(1000);

    //emit outputs from one observable
    const example = StaticMerge(
      first.pipe(mapTo('FIRST!')),
      second.pipe(mapTo('SECOND!')),
      third.pipe(mapTo('THIRD')),
      fourth.pipe(mapTo('FOURTH'))
    );
    //output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
    const subscribe = example.subscribe(val => console.log(val));
  }

  instanceMerge() {
    //emit every 2.5 seconds
    const first = interval(2500);
    //emit every 1 second
    const second = interval(1000).pipe(map(val => `two ${val}`));
    //used as instance method
    const example = first.pipe(map(val => `one ${val}`), merge(second));
    //output: 0,1,0,2....
    const subscribe = example.subscribe(val => console.log(val));
  }
}
