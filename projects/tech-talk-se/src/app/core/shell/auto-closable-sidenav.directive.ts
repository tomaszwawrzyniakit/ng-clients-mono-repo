import { Directive, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, withLatestFrom, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Directive({
  selector: '[ttAutoClosableSidenav]'
})
export class AutoClosableSidenavDirective implements OnInit, OnDestroy {
  private isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  private closeSubscription: Subscription;
  constructor(
    private drawer: MatSidenav,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.closeSubscription = this.router.events
      .pipe(
        withLatestFrom(this.isHandset$),
        filter(([event, isHandset]) => isHandset && event instanceof NavigationEnd)
      )
      .subscribe(() => this.drawer.close());
  }
  ngOnDestroy(): void {
    this.closeSubscription.unsubscribe();
  }
}
