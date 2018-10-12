import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-pipeable-operator',
  templateUrl: './pipeable-operator.component.html',
  styleUrls: ['./pipeable-operator.component.css']
})
export class PipeableOperatorComponent implements OnInit {

  private obs$ : Observable<number[]>;
  constructor() { 
    this.obs$  = of([0,1,2,3,4,5,6,7,8,9]
      //,[0,11,22,33,44,55,66,77,88,99]
      );
  }

  ngOnInit() {
    this.obs$.pipe(map(x=> x.filter(y=>y%2))).subscribe(
      x=>console.log(x)
    );
  }

  get GetObservable():Observable<number[]> {
    return this.obs$.pipe(map(x=> x.filter(y=>y%2))
    //,take(1)
    );
  }
}
