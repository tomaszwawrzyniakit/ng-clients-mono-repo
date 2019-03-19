import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 's19-venue-plan',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent {
  hotels = [];
  constructor(route: ActivatedRoute) {
    this.hotels = route.snapshot.data['hotels'];
  }
}
