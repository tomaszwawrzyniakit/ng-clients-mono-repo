import { Component } from '@angular/core';

import { createNavigateCommandsOf } from '../../../components/summit-selection/summit-selection.component';
import { summits } from '../../../services/summit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 's19-em-pnq-side-nav',
  templateUrl: './em-pnq-side-nav.component.html',
  styleUrls: ['./em-pnq-side-nav.component.scss']
})
export class EmPnqSideNavComponent {
  summitScheduleNavigateCommands;

  feedBackUrl;

  constructor(route: ActivatedRoute) {
    this.summitScheduleNavigateCommands = createNavigateCommandsOf(
      summits.EM_PNQ
    );
    this.feedBackUrl = route.snapshot.data['feedBackUrl'];
  }
}
