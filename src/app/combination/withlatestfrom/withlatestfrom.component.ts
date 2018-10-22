import { interval, of, fromEvent, from, Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { withLatestFrom, map, delay, switchMapTo, scan, count, share, concatAll } from 'rxjs/operators';

@Component({
  selector: 'app-withlatestfrom',
  templateUrl: './withlatestfrom.component.html',
  styleUrls: ['./withlatestfrom.component.css']
})
export class WithlatestfromComponent implements OnInit, AfterViewInit {
  
  @ViewChild('load') loadButtonEle: ElementRef;
  @ViewChild('progress') progressBarEle: ElementRef;
  @ViewChild('data') contentEle: ElementRef;
  @ViewChild('progressEle') progressEle: ElementRef;

  get loadButton(){
    return this.loadButtonEle.nativeElement;
  }

  get progressBar() {
    return this.progressBarEle.nativeElement;
  }

  get content(){
    return this.contentEle.nativeElement;
  }

  constructor() { }

  ngOnInit() {
  }

  Quicker2ndSrc() {
    const sourceOne = interval(5000);

    const sourceTwo = interval(1000);

    const ob$ = sourceOne.pipe(
      withLatestFrom(sourceTwo),
      map(([first, second]) => {
        return `First Source (5s): ${first}, Second source (1s): ${second}`
      })
    );

    const subscribe = ob$.subscribe(val => console.log(val));
  }

  Slower2ndSrc() {
    const sourceOne = interval(1000);

    const sourceTwo = interval(5000);

    const ob$ = sourceOne.pipe(
      withLatestFrom(sourceTwo),
      map(([first, second]) => {
        return `First Source (1s): ${first}, Second source (5s): ${second}`
      })
    );

    const subscribe = ob$.subscribe(val => console.log(val));
  }
/*Progress Bar */
  requestOne = of('first').pipe(delay(500));
  requestTwo = of('second').pipe(delay(800));
  requestThree = of('third').pipe(delay(1100));
  requestFour = of('fourth').pipe(delay(1400));
  requestFive = of('fifth').pipe(delay(1700));

  ngAfterViewInit(): void {
    const observables: Array<Observable<string>> = [
      this.requestOne,
      this.requestTwo,
      this.requestThree,
      this.requestFour,
      this.requestFive
    ];

    const array$ = from(observables);
    const requests$ = array$.pipe(concatAll());
    //Bind event to button
    const clicks$ = fromEvent(document.getElementById('load'), 'click');

    const progress$ = clicks$.pipe(
      switchMapTo(requests$),
      share()
    );

    const count$ = array$.pipe(count());

    const ratio$ = progress$.pipe(
      map((acc)=>{
        console.log(`Progress map ${acc}`)
        return parseInt(acc);
        }
      ),
      scan(current => current + 1, 0),
      withLatestFrom(count$, (current, count) => current / count)
    );

    clicks$.pipe(switchMapTo(ratio$)).subscribe((val)=>this.updateProgress(val));

    progress$.subscribe(val => this.displayData(val));
  }
  
  // update progress bar as requests complete
  updateProgress(progressRatio) {
    console.log('Progress Ratio: ', progressRatio);
    this.progressEle.nativeElement.value = progressRatio;
    this.progressBar.style.width = 100 * progressRatio + '%';
    if (progressRatio === 1) {
      this.progressBar.className += ' finished';
    } else {
      this.progressBar.className = this.progressBar.className.replace(' finished', '');
    }
  };

  // simple helper to log updates
  updateContent(newContent) {
    this.content.innerHTML += newContent;
  };

  displayData (data) {
    this.updateContent(`<div class="content-item">${data}</div>`);
  };
}
