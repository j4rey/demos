import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, Subscription, fromEvent, of } from 'rxjs';
import { debounceTime, map, switchMap, filter, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-debouncetime',
  templateUrl: './debouncetime.component.html',
  styleUrls: ['./debouncetime.component.css']
})
export class DebouncetimeComponent implements OnInit, AfterViewInit {
  
  @ViewChild('inputTxt') inputTxt: ElementRef;
  inputObservable$: Observable<any>;
  subscribe: Subscription;
  debounceTimeVal = 500;

  @ViewChild('inputHttpJson') inputHttpJson: ElementRef;
  inputHttpJson$: Observable<any>
  httpurl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private httpClient: HttpClient) { }
  
  ngOnInit() {
    
  }
  
  ngAfterViewInit(): void {
    // this.inputHttpJson$ = fromEvent(this.inputHttpJson.nativeElement,'keyup')
    // .pipe(
    //   map((i:any) => i.currentTarget.value),
    //   debounceTime(this.debounceTimeVal),
    //   switchMap(val=> this.httpClient.get('https://jsonplaceholder.typicode.com/posts')
    //     .pipe(
    //       map((res:[])=>{
    //         return res.filter((ob:any)=>ob.title.includes(val))
    //       })
    //     )
    //   )
    // )
  }

  debounceTimeBasedOnInput(){
    this.inputObservable$ = fromEvent(this.inputTxt.nativeElement,'keyup')
    .pipe(map((i:any) => i.currentTarget.value),debounceTime(this.debounceTimeVal));
    if(this.subscribe != null) this.subscribe.unsubscribe();
    this.subscribe = this.inputObservable$.subscribe(val=>console.log(`Debounced value: ${val}`))


    this.inputHttpJson$ = fromEvent(this.inputHttpJson.nativeElement,'keyup')
    .pipe(
      map((i:any) => {console.log(`value:${i.currentTarget.value}`);return i.currentTarget.value}),
      debounceTime(this.debounceTimeVal),
      switchMap(val=> this.httpClient.get(this.httpurl)
        .pipe(
          catchError(err=> of([])),
          map((res:any)=>{
              return res.filter((ob:any)=>ob.title.includes(val));
          })
        )
      )
    )
  }
}