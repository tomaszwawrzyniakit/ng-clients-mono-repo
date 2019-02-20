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

  debug = false;

  constructor(private swPush: SwPush,
              private subscription: SubscriptionService,
              @Inject(SW_PUB_SUB_VAPID_PUBLIC_KEY) private readonly vapidPublicKey: string) {
    this.swPushEnabled = swPush.isEnabled && !this.iOS();
  }

  ngOnInit(): void {
    if (this.swPushEnabled) {
      this.swPush.subscription.pipe(
        take(1),
      ).subscribe(pushSubscription => {
        this.alreadySubscribed = pushSubscription !== null;
        this.log('Checking if already subscribed... ', this.alreadySubscribed ? 'yes' : 'no');
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
    this.log('Unsubscribing...');
    this.swPush.subscription.pipe(
      take(1),
    ).subscribe((pushSubscription) => {
      this.log('Got current subscription... ', pushSubscription);
      if (pushSubscription) {
        this.log('Calling pushSubscription.unsubscribe()...');
        pushSubscription.unsubscribe()
          .then(_ => {
            this.log('pushSubscription.unsubscribe() successful; calling the server...');
            this.subscription.doUnsubscribe(pushSubscription.endpoint).subscribe(() => {
              this.whileToggling = false;
              this.alreadySubscribed = false;
              this.log('Unsubscribing on the server successful');
            }, error => {
              this.whileToggling = false;
              this.log('Unsubscribing on the server failed', error);
            });
          })
          .catch(err => {
            this.whileToggling = false;
            this.log('pushSubscription.unsubscribe() failed', err);
          });
      } else {
        this.whileToggling = false;
        this.alreadySubscribed = false;
      }
    }, error => {
      this.whileToggling = false;
      this.log('Error while getting current subscription... ', error);
    });
  }

  private subscribe() {
    this.log('Calling swPush.requestSubscription()');
    this.swPush.requestSubscription({
      serverPublicKey: this.vapidPublicKey
    })
      .then(sub => {
        this.log('swPush.requestSubscription() successful; calling the server', sub);
        this.subscription.doSubscribe(sub).subscribe(_ => {
          this.whileToggling = false;
          this.alreadySubscribed = true;
          this.log('Subscribing on the server successful');
        }, error => {
          this.whileToggling = false;
          this.log('Subscribing on the server failed', error);
        });
      })
      .catch(err => {
        this.whileToggling = false;
        this.log('swPush.requestSubscription() failed', err);
      });
  }

  /* tslint:disable:no-console */
  private log(...items: any[]) {
    if (this.debug) {
      console.log(items);
    }
  }

  private iOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
  }
}
