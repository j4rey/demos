import { Component, OnInit } from '@angular/core';
import { throwError, of, timer, from } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-catcherror',
  templateUrl: './catcherror.component.html',
  styleUrls: ['./catcherror.component.css']
})
export class CatcherrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  CatchBadObservable() {
    const source = throwError('Bad Observable');
    //gracefully handle error, returning observable with error message
    const observable$ = source.pipe(catchError(val => of(`I caught ${val}`)));
    //output: 'I caught: This is an error'
    const subscribe = observable$.subscribe(x => console.log(x));
  }

  CatchBadPromise() {
    //create promise that immediately rejects
    const myBadPromise = () =>
      new Promise((resolve, reject) => reject('Rejected!'));
    //emit single value after 1 second
    const source = timer(1000);
    //catch rejected promise, returning observable containing error message
    const example = source.pipe(
      mergeMap(_ =>
        from(myBadPromise()).pipe(catchError(error => of(`Bad Promise: ${error}`)))
      )
    );
    //output: 'Bad Promise: Rejected'
    const subscribe = example.subscribe(val => console.log(val));
  }
}
