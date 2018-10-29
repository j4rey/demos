import { Component, OnInit, AfterViewInit } from '@angular/core';
import {of, interval, fromEvent, Subscription, Observable} from 'rxjs'
import {take, tap} from 'rxjs/operators'

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.css']
})
export class TakeComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    
  }

  constructor() { }

  ngOnInit() {

  }
  TakeOneNumber(){
    const source = of(1,2,3,4,5);
    const observable$ = source.pipe(take(1))
    .subscribe(x=>console.log(`Take One: ${x}`));
  }
  TakeFive(){
    const source = interval(1000);
    const observable$ = source.pipe(take(5))
    .subscribe(x=>console.log(`Take Five: ${x}`));
  }
  ClickObservable$: Observable<Event>
  ClickSubscription: Subscription;
  TakeClickOnScreen(){
    this.ClickObservable$ = fromEvent(document,'click')
    .pipe(
      take(5),
      tap((v:MouseEvent)=>{
        console.log(v);
        //console.log(`Clicked on location: ${v.screenX}: ${v.screenY}`)
      })
    )
    this.ClickSubscription = this.ClickObservable$.subscribe();
  }
}