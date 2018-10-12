import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Component({
  selector: 'app-trackby',
  templateUrl: './trackby.component.html',
  styleUrls: ['./trackby.component.css']
})
export class TrackbyComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    console.log('this.childChildren.length',this.childChildren.length)
  }
  @ViewChildren('input') childChildren: QueryList<ElementRef>;
  arrString$
  public arrString = []
  // = [
  //   'One',
  //   'Two',
  //   'Three'
  // ]

  strInput = "Input"

  constructor() { }

  ngOnInit() {
    

    this.arrString$ = of([
      'One',
      'Two',
      'Three'
    ]).pipe(delay(1000)).

    subscribe(
      x=>{
        console.log(x);
        this.arrString = x;

        setTimeout(() => {
          console.log('this.childChildren.length',this.childChildren.length)
        }, 1000);
      }
    );
  }


  trackByFn(index:number,item:any){
    //do what ever logic you need to come up with the unique identifier of your item in loop.
    //Return the object id.
    //Here I am returning the index
    return index; 
   }
}
