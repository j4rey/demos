import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, ReplaySubject, pipe, interval } from 'rxjs';
import { takeUntil, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-declarative-subscription',
  templateUrl: './declarative-subscription.component.html',
  styleUrls: ['./declarative-subscription.component.css']
})
export class DeclarativeSubscriptionComponent implements OnInit {
  @ViewChild('subscribe') subscribe: ElementRef;
  @ViewChild('unsubscribe') unsubscribe: ElementRef;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //subscribe section
    const subscribeclick$ = fromEvent(this.subscribe.nativeElement,'click');
subscribeclick$.pipe(takeUntil(this.destroyed$)
  //,map(x=>x),mergeMap(x=> {return interval(1000)})
  )
.subscribe(x=>{
  console.log('subscribed', x)
});
    //unsubscribe section
    const unsubscribeclickc$ = fromEvent(this.unsubscribe.nativeElement, 'click');
    unsubscribeclickc$
    //pipe(takeUntil(this.destroyed$),map(x=>x))
    .subscribe(x=>{
      console.log('destroyed')
      this.destroyed$.next(true);
      this.destroyed$.complete();
    });
  }
}
