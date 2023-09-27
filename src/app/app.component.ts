import { Component, OnDestroy } from '@angular/core';
import { mapTo, takeUntil, take, combineLatest, combineAll, shareReplay } from 'rxjs/operators';
import { interval, merge, Subject, ReplaySubject, of, timer } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor() {
    //this.mergeExample();
    // this.combineLatestExample();
    this.combineAllExample();
  }

  mergeExample() {
    const first = interval(1000).pipe(mapTo('first'), take(5));
    const second = interval(1500).pipe(mapTo('second'), take(5));
    merge(first, second).pipe(takeUntil(this.unsubscribe)).subscribe(console.log);
  }

  combineLatestExample() {
    const second = of('Latest value from second obs');
    const first = of('First value from first obs');
    first.pipe(combineLatest(second)).subscribe(console.log);
  }

  combineAllExample() {
    const second = of('1');
    const first = of('2');
    merge(first, second).pipe(combineAll()).subscribe(console.log);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
