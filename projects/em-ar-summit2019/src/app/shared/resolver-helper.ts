import { ActivatedRouteSnapshot } from '@angular/router';

function retriveCustomizedSummitName(route: ActivatedRouteSnapshot) {
  const customizedSummit = [...route.parent.url].pop();
  return customizedSummit.path;
}
export function retriveSummitName(route: ActivatedRouteSnapshot) {
  return route.params['summitName'] || retriveCustomizedSummitName(route);
}
