import { Directive, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Directive({
  selector: '[elibAutoClosableSidenav]'
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
  ) {
  }

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
