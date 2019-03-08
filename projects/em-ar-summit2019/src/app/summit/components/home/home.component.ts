import { Component, OnInit } from '@angular/core';
import { SummitService } from '../../services/summit.service';
import { Router } from '@angular/router';
import { navigateUsing } from '../summit-selection/summit-selection.component';

@Component({
  selector: 's19-home',
  template: ''
})
export class HomeComponent implements OnInit {

  constructor(private summitService: SummitService, private router: Router) {
  }

  ngOnInit() {
    const currentSummit = this.summitService.getStoredSummit();
    if (currentSummit) {
      navigateUsing(this.router).toScheduleOf(currentSummit);
    } else {
      this.router.navigate(['/summit-selection']);
    }
  }
}
