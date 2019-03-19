import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Schedule } from 'event-lib';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { retriveSummitName } from '../../../shared/resolver-helper';

const venues = {
  'arch-wro': {
    places: [
      {
        name: 'Hotel Mercure',
        adres: [
          'pl. Dominikański 1',
          '50-159 WROCŁAW',
          'POLAND',
          '+48 71 3232700'
        ],
        navigateUrl:
          'https://www.google.com/maps/dir/?api=1&destination=Mercure+Wrocław+Centrum&destination_place_id=ChIJ4f2vj3fCD0cRM05-5W5lV5Y',
        contacts: [{ tel: '+48-71-3232700' }]
      }
    ]
  },
  'em-pnq': {
    places: [
      {
        name: 'Capgemini University Campus, Manas Building, 3rd Floor',
        subtitle: 'EM Summit (22-March, 23-March)',
        adres: [
          'No.14, Phase III, Rajiv Gandhi Infotech Park, Village Man, Taluka, Mulshi, Haveli, Hinjewadi, Pune',
          'Maharashtra 411057',
          '9619669845 (Santhana Sebastian)',
          '9930971240 (Prashant Setty)'
        ],
        navigateUrl:
          'https://www.google.com/maps/place/Capgemini/@18.5973002,73.6925236,15z/data=!4m5!3m4!1s0x0:0x706d727fbeb8203!8m2!3d18.5973002!4d73.6925236',
        contacts: [
          { name: 'Santhana Sebastian', tel: '+91-96-1966-9845' },
          { name: 'Prashant Setty', tel: '+91-99-3097-1240' }
        ]
      },
      {
        name: 'Hotel ZIP BY SPREE',
        subtitle: 'Stay & Breakfast (22-March, 23-March)',
        adres: [
          'Marunji Rd, Hinjewadi Phase II, Marunji Village, Hinjewadi, Marunji',
          'Maharashtra 411033',
          '020 6770 5555'
        ],
        navigateUrl:
          'https://www.google.com/maps/place/Zip+by+Spree+Spine/@18.6104709,73.7202883,17.75z/data=!4m5!3m4!1s0x0:0x4dcdd1e348403272!8m2!3d18.6101709!4d73.7207307',
        contacts: [{ tel: '+91-20-6770-5555' }]
      },
      {
        name: 'The Gateway Hotel',
        subtitle: 'Social Dinner (22-March)',
        adres: [
          'Xion Complex, Wakad Road, Hinjewadi, Pune',
          'Maharashtra 411057',
          '020 6658 4040'
        ],
        navigateUrl:
          "https://www.google.com/maps/place/18%C2%B035'30.4%22N+73%C2%B044'38.4%22E/@18.591772,73.744001,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d18.591772!4d73.744001",
        contacts: [{ tel: '+91-20-6658-4040' }]
      }
    ],
    contacts: [
      {
        name: 'Santhana Sebastian',
        email: 'santhana.sebastian@capgemini.com',
        tel: '+91-96-1966-9845'
      },
      {
        name: 'Prashant Setty',
        email: 'prashant.setty@capgemini.com',
        tel: '+91-99-3097-1240'
      }
    ]
  }
};

@Injectable({
  providedIn: 'root'
})
export class VenueDialogResolver implements Resolve<Schedule> {
  constructor() {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Schedule> | Promise<Schedule> | Schedule {
    const summitName = retriveSummitName(route);

    return venues[summitName];
  }
}
