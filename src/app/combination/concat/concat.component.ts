import { Component, OnInit } from '@angular/core';
import { of, concat as StaticConcat, interval } from 'rxjs';
import { delay, concat } from 'rxjs/operators';

@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.css']
})
export class ConcatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  staticConcat() {
    //emits 1,2,3
    const sourceOne = of(1, 2, 3);
    //emits 4,5,6
    const sourceTwo = of(4, 5, 6);

    //used as static
    const example$ = StaticConcat(sourceOne, sourceTwo);
    //output: 1,2,3,4,5,6
    const subscribe = example$.subscribe(val => console.log(val));
  }

  delayedConcat() {
    //emits 1,2,3
    const sourceOne = of(1, 2, 3);
    //emits 4,5,6
    const sourceTwo = of(4, 5, 6);

    //delay 3 seconds then emit
    const sourceThree = sourceOne.pipe(delay(3000));
    //sourceTwo waits on sourceOne to complete before subscribing
    const example = sourceThree.pipe(concat(sourceTwo));
    //output: 1,2,3,4,5,6
    const subscribe = example.subscribe(val =>
      console.log('Example: Delayed source one:', val)
    );
  }

  wrongConcat() {
    //when source never completes, the subsequent observables never runs
    const source$ = StaticConcat(interval(1000), of('This', 'Never', 'Runs'));
    //outputs: 0,1,2,3,4....
    const subscribe = source$.subscribe(val =>
      console.log(
        'Example: Source never completes, second observable never runs:',
        val
      )
    );
  }
}
