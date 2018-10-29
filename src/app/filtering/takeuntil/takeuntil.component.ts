import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { takeUntil, filter, scan, withLatestFrom, map } from 'rxjs/operators';

@Component({
  selector: 'app-takeuntil',
  templateUrl: './takeuntil.component.html',
  styleUrls: ['./takeuntil.component.css']
})
export class TakeuntilComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  TakeUntilTimerEmits(){
    const source$ = interval(1000);
    const timer$ = timer(5000);
    const example = source$.pipe(takeUntil(timer$));
    const subscribe = example.subscribe((val)=>console.log(val));
  }

  TakeFirst5EvenNumbers(){
    //emit value every 1s
    const source = interval(1000);
    //is even number
    const isEven = val => val % 2 === 0;
    //only allow values that are even
    const evenSource = source.pipe(filter(isEven));
    //keep a running total of the number of even numbers out
    const evenNumberCount = evenSource.pipe(scan((acc,_)=>acc + 1, 0));
    //do not emit until 5 even numbers have been emitted
    const fiveEvenNumbers = evenNumberCount.pipe(filter(val=>val > 5));

    const example = evenSource.pipe(
      //also given me the current even number count for display
      withLatestFrom(evenNumberCount),
      map(([val,count])=> `Even number (${count}): ${val}`),
      //when five even numbers have been emitted, complete source observable
      takeUntil(fiveEvenNumbers)
    )

    const subscribe = example.subscribe(val  => console.log(val))
  }
}