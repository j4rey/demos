import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { promise } from 'protractor';
import { resolve } from 'url';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.css']
})
export class FromComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  fromArray() {
    const arr = [1,2,3,4,5];
    const observable$ = from(arr);
    //OUTPUT: 1,2,3,4,5
    const subscribe = observable$.subscribe(val=>console.log(val));
  }

  fromPromise(){
    const observable$ = from(new Promise((resolve)=>resolve('Hello World')));
    //OUTPUT: Hello World
    const subscribe = observable$.subscribe(val=>console.log(val));
  }

  fromCollection(){
    const map = new Map();
    map.set(1,"One");
    map.set(2,"Two");

    const observable$ = from(map);
    //OUTPUT: [1,"One"], [2,"Two"]
    const subscribe = observable$.subscribe(val=>console.log(val));
  }

  fromString(){
    const observable$ = from("Hello World!");
    //OUTPUT: "H","e","l","l","o"," ","W","o","r","l","d","!"
    const subscribe = observable$.subscribe(val=>console.log(val));
  }
}
