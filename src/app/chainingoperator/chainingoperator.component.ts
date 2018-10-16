import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, Observable, combineLatest } from 'rxjs';
import { withLatestFrom, take } from 'rxjs/operators';

@Component({
  selector: 'app-chainingoperator',
  templateUrl: './chainingoperator.component.html',
  styleUrls: ['./chainingoperator.component.css']
})
export class ChainingoperatorComponent implements OnInit, AfterViewInit {
  @ViewChild('firstBtnWithLatest') firstBtnWithLatest: ElementRef;
  @ViewChild('secondBtnWithLatest') secondBtnWithLatest: ElementRef;
  @ViewChild('firstBtnCombineLatest') firstBtnCombineLatest: ElementRef;
  @ViewChild('secondBtnCombineLatest') secondBtnCombineLatest: ElementRef;
  
  
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.initializeWithLatest();
    this.initializeCombineLatest();
  }
  initializeCombineLatest(): any {
    const firstBtnCombineLatest$ = fromEvent(this.firstBtnCombineLatest.nativeElement, 'click');
    const secondBtnCombineLatest$ = fromEvent(this.secondBtnCombineLatest.nativeElement, 'click');

    //firstBtnCombineLatest$.subscribe(x=>console.log('first combine latest:', x));

    combineLatest(firstBtnCombineLatest$,secondBtnCombineLatest$)
    .subscribe(x=>console.log('Combine Latest:', x));
  }
  initializeWithLatest(): any {
    const firstBtnWithLatest$ = fromEvent(this.firstBtnWithLatest.nativeElement,'click');
    const secondBtnWithLatest$ = fromEvent(this.secondBtnWithLatest.nativeElement,'click');

    firstBtnWithLatest$
    .subscribe(x=>console.log('first subscribe', x));


    secondBtnWithLatest$.pipe(
      withLatestFrom(firstBtnWithLatest$)
    )
    .subscribe(x=>console.log('second subscribe', x));
  }
}
