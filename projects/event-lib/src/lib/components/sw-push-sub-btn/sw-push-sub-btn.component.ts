import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { SubscriptionService } from '../../services/subscription.service';
import { take } from 'rxjs/operators';

export const SW_PUB_SUB_VAPID_PUBLIC_KEY = new InjectionToken('SW_PUB_SUB_VAPID_PUBLIC_KEY');

@Component({
  selector: 'elib-sw-push-sub-btn',
  templateUrl: './sw-push-sub-btn.component.html',
  styleUrls: ['./sw-push-sub-btn.component.scss'],
  exportAs: 'swPubSubBtn'
})
export class SwPushSubBtnComponent implements OnInit {
  swPushEnabled = true;
  alreadySubscribed = false;
  whileToggling = false;

  constructor(private swPush: SwPush,
              private subscription: SubscriptionService,
              @Inject(SW_PUB_SUB_VAPID_PUBLIC_KEY) private readonly vapidPublicKey: string) {
    this.swPushEnabled = swPush.isEnabled && !this.iOS();
  }

  /* tslint:disable:no-console */
  ngOnInit(): void {
    if (this.swPushEnabled) {
      this.swPush.subscription.pipe(
        take(1),
      ).subscribe(pushSubscription => {
        console.debug('Checking if already subscribed: ' + pushSubscription);
        this.alreadySubscribed = pushSubscription !== null;
      });
    }
  }

  togglePushNotifications() {
    if (!this.whileToggling) {
      this.whileToggling = true;

      if (this.alreadySubscribed) {
        this.unsubscribe();
      } else {
        this.subscribe();
      }
    }
  }

  private unsubscribe() {
    console.debug('Unsubscribing...');
    this.swPush.subscription.pipe(
      take(1),
    ).subscribe((pushSubscription) => {
      console.debug('Got current subscription... ', pushSubscription);
      if (pushSubscription) {
        console.debug('Calling pushSubscription.unsubscribe()...');
        pushSubscription.unsubscribe()
          .then(_ => {
            console.debug('pushSubscription.unsubscribe() successful; calling the server...');
            this.subscription.doUnsubscribe(pushSubscription.endpoint).subscribe(() => {
              this.whileToggling = false;
              this.alreadySubscribed = false;
              console.debug('Unsubscribing on the server successful');
            }, error => {
              this.whileToggling = false;
              console.debug('Unsubscribing on the server failed', error);
            });
          })
          .catch(err => {
            this.whileToggling = false;
            console.error('pushSubscription.unsubscribe() failed', err);
          });
      } else {
        this.whileToggling = false;
        this.alreadySubscribed = false;
      }
    }, error => {
      this.whileToggling = false;
      console.debug('Error while getting current subscription... ' + error);
    });
  }

  private subscribe() {
    console.debug('Calling swPush.requestSubscription()');
    this.swPush.requestSubscription({
      serverPublicKey: this.vapidPublicKey
    })
      .then(sub => {
        console.debug('swPush.requestSubscription() successful; calling the server', sub);
        this.subscription.doSubscribe(sub).subscribe(_ => {
          this.whileToggling = false;
          this.alreadySubscribed = true;
          console.debug('Subscribing on the server successful');
        }, error => {
          this.whileToggling = false;
          console.debug('Subscribing on the server failed' + error);
        });
      })
      .catch(err => {
        this.whileToggling = false;
        console.debug('swPush.requestSubscription() failed', err);
      });
  }

  private iOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
  }
}
