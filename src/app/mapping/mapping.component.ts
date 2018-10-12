import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, interval, Subscription, of } from 'rxjs';
import { switchMap, mapTo, map, mergeAll, mergeMap, concatMap, delay, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {
  @ViewChild('switchmap00') switchmap00: ElementRef;
  @ViewChild('mergeall00') mergeall00: ElementRef;
  @ViewChild('exhaustmap00') exhaustmap00: ElementRef;
  
  constructor() { }

  ngOnInit() {


  }

  ngAfterViewInit() {
    this.initializeSwitchMap();
    this.initializeMergeMap();
    this.initializeExhaustMap();
  }
 

  initializeSwitchMap(): void {
    // switchMap: when you want to ignore the previous emissions when there is a new emission

    // let switchmap00Stream$ = fromEvent(this.switchmap00.nativeElement, 'click')
    // switchmap00Stream$.pipe(
    //   switchMap(val => interval(3000).pipe(mapTo('Hello, I made it!')))
    // ).subscribe(res => console.log(res));

    const switchclick$ = fromEvent(this.switchmap00.nativeElement, 'click');
    switchclick$.pipe(switchMap(val => { return interval(1000) }))
      .subscribe(x => console.log('switch', x));
  }

  initializeMergeMap(): void {
    // mergeMap: when you want to concurrently handle all the emissions
    // mergeMap =  map() + mergeAll()
    const click$ = fromEvent(this.mergeall00.nativeElement, 'click');
    const interval$ = interval(1000);

    // const observable$ = click$.pipe(
    //   map(event => {
    //     return interval$;
    //   })
    // )
    //observable$.pipe(mergeAll()).subscribe(num => console.log('subscribe', num));

    //or

    const observable$ = click$.pipe(
      mergeMap(event => {
        return interval$;
      })
    )
    observable$.subscribe(num => console.log('subscribe', num));
  }

  initializeConcatMap(): any {
    // concatMap: when you want to handle the emissions one after the other as they are emitted
    const source$ = of(2000,1000);

    const observable$ = source$.pipe(concatMap(val => of(`Delayed by ${val}`).pipe(delay(val))));

    const subscribe = observable$.subscribe(val => console.log(val))
  }

  ConcatMapVsMergeMap() {
    const source$ = of(2000,1000);

    const observable$ = source$.pipe(mergeMap(val => of(`Delayed by ${val}`).pipe(delay(val))));

    const subscribe = observable$.subscribe(val => console.log(val))
  }

  ExhaustMapCounter = 0;
  initializeExhaustMap(){
    // exhaustMap: when you want to cancel all the new emissions while processing a previous emisssion
    const exhaustmap00click$  = fromEvent(this.exhaustmap00.nativeElement,'click');

    exhaustmap00click$.pipe(
      map(y=>{console.log('clicked'); return y}),
      exhaustMap(val=> {
        console.log('new Exhaust')
        return of(`Exhaust ${this.ExhaustMapCounter++}`).pipe(delay(2000))
      })
    )
    .subscribe(x=>console.log('subscribe', x))
  }
}
