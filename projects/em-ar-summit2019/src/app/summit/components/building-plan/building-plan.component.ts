import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 's19-building-plan',
  template: '<img [src]="imgSrc" alt="Building Plan" />',
  styleUrls: ['./building-plan.component.scss']
})
export class BuildingPlanComponent {
  imgSrc: string;

  @HostBinding('style.background-color')
  backgroundColor;

  constructor(route: ActivatedRoute) {
    this.imgSrc = route.snapshot.data['imgSrc'];
    this.backgroundColor = route.snapshot.data['backgroundColor'];

  }
}
