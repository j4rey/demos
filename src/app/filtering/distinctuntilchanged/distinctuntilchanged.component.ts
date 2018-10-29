import { Component, OnInit } from '@angular/core';
import { Subject, from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-distinctuntilchanged',
  templateUrl: './distinctuntilchanged.component.html',
  styleUrls: ['./distinctuntilchanged.component.css']
})
export class DistinctuntilchangedComponent implements OnInit {

  data:string = "1"
  sub = new Subject();
  constructor() { }

  ngOnInit() {
    this.sub.pipe((distinctUntilChanged()))
    .subscribe(val=>console.log(`Value: ${val}`));
  }

  emitData(){
    this.sub.next(this.data);
  }

  distinctUntilChangedObjects(){
    const ObjectOne = {name: 'Alpha'};
    const ObjectTwo = {name: 'Beta'};
    const ObjectOneCopy = {name: 'Alpha'};

    const observable$ = from([ObjectOne,ObjectTwo,ObjectTwo,ObjectOne,ObjectOneCopy])
    .pipe(distinctUntilChanged())
    .subscribe(val => console.log(val));
  }
}
