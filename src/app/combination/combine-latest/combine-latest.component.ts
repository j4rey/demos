import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, ReplaySubject, fromEvent } from 'rxjs';
import { mapTo, startWith, scan, tap, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.css']
})
export class CombineLatestComponent implements OnInit, OnDestroy {

  destroyed$ = new ReplaySubject<boolean>();

  // helper function to set HTML
  setHtml = id => val => (document.getElementById(id).innerHTML = val);

  addOneClick$ = id =>
    fromEvent(document.getElementById(id), 'click').pipe(
      // map every click to 1
      mapTo(1),
      startWith(0),
      // keep a running total
      scan((acc, curr) => acc + curr),
      // set HTML for appropriate element
      tap(this.setHtml(`${id}Total`))
    );

  constructor() { }

  ngOnInit() {
    const combineTotal$ = combineLatest(this.addOneClick$('red'), this.addOneClick$('black'))
      .pipe(
        takeUntil(this.destroyed$),
        map(([val1, val2]) => val1 + val2)
      )
      .subscribe(this.setHtml('total'));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}