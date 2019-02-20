import { ModuleWithProviders, NgModule } from '@angular/core';
import { SW_PUB_SUB_VAPID_PUBLIC_KEY, SwPushSubBtnComponent } from './components/sw-push-sub-btn/sw-push-sub-btn.component';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { SubscriptionService, SW_PUB_SUB_SERVER_URI } from './services/subscription.service';
import { HttpClient } from '@angular/common/http';

export interface SwPushSubModuleConfig {
  vapidPublicKey: string;
  serverUri: string;
}

@NgModule({
  declarations: [SwPushSubBtnComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  exports: [SwPushSubBtnComponent]
})
export class SwPushSubModule {
  static forRoot(config: SwPushSubModuleConfig): ModuleWithProviders {
    return {
      ngModule: SwPushSubModule,
      providers: [
        {provide: SW_PUB_SUB_VAPID_PUBLIC_KEY, useValue: config.vapidPublicKey},
        {provide: SW_PUB_SUB_SERVER_URI, useValue: config.serverUri},
        {provide: SubscriptionService, useClass: SubscriptionService, deps: [HttpClient, SW_PUB_SUB_SERVER_URI]}
      ]
    };
  }
}
