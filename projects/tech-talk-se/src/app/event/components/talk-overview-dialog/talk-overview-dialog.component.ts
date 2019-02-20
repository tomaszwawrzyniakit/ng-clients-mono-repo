import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PresenterTo, Talks } from 'event-lib';
import { ActivatedRoute } from '@angular/router';

interface TalkItem {
  id: number;
  title: string;
  description?: string;
  speakerImgSources?: string[];
  speakerNames?: string;
  speakerDetails?: PresenterTo[];
}

export function createTalkId(talkId: number) {
  return `talk-${talkId}`;
}

@Component({
  selector: 'tt-talk-overview-dialog',
  templateUrl: './talk-overview-dialog.component.html',
  styleUrls: ['./talk-overview-dialog.component.scss']
})
export class TalkOverviewDialogComponent implements AfterViewInit {
  @ViewChild('listContainer')
  listContainer: ElementRef;

  talks: TalkItem[];

  createTalkId = createTalkId;

  constructor(private route: ActivatedRoute) {
    this.setTalkItems(route.snapshot.data['talks']);
  }

  private setTalkItems(talks: Talks) {
    this.talks = [];
    if (talks) {
      this.talks = talks.talks.map(talkTo => {
        let speakerProperties = {speakerImgSources: [], speakerNames: '', speakerDetails: []};
        if (talks.presenters) {
          speakerProperties = talks.presenters.reduce((speakerProps, currentPresenter, index) => {
            if (talkTo.presenters && talkTo.presenters.indexOf(currentPresenter.id) !== -1) {
              if (currentPresenter.imgSrc) {
                speakerProps.speakerImgSources.push(currentPresenter.imgSrc);
              }
              speakerProps.speakerNames += (speakerProps.speakerNames ? ', ' : '') + currentPresenter.name;
              speakerProps.speakerDetails.push(currentPresenter);
            }
            return speakerProps;
          }, speakerProperties);
        }
        return {...talkTo, ...speakerProperties};
      });
    }
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(talkId => {
      if (this.listContainer && this.listContainer.nativeElement) {
        const talkElement = this.listContainer.nativeElement.querySelector(`#${talkId}`);
        if (talkElement && talkElement.scrollIntoView) {
          talkElement.scrollIntoView();
        }
      }
    });
  }
}
