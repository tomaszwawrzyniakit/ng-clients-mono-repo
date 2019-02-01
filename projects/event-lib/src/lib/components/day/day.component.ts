import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Day, StreamTo, TimeSlot } from '../../services/model';
import { compareByStartTimeAndStream, compareSimpleValues } from '../../services/selectors';
import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment; // workaround for Rollup

interface TimeSlotGridItem {
  timeSlot: TimeSlot;
  colSpan: number;
  bgColor: string;
  textColor: string;
}

export interface DayAndStreams {
  day: Day;
  streams?: StreamTo[];
}

@Component({
  selector: 'elib-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {
  @ViewChild('dayGrid')
  dayGridElement: ElementRef;

  @Input()
  set dayAndStreams(value: DayAndStreams) {
    this.setStreamsFrom(value);
    if (this.streams.length > 1) {
      this.gridTemplateColumnsCssProp = '1fr '.repeat(this.streams.length);
    }
    if (value && value.day) {
      this.date = value.day && value.day.date;
      this.formattedDate = (value.day && value.day.date && value.day.date.format('DD.MM.YYYY')) || '';
      this.setGridItemsMap(value.day.timeSlots);
    }
  }

  streams: StreamTo[] = [];
  date: Moment;
  formattedDate = '';
  gridTemplateColumnsCssProp = '1fr';
  timeSlotGridItemsByStartTimes: { [startTime: string]: TimeSlotGridItem[] } = {};
  startTimes: string[] = [];

  private scrolledPosition: string;

  getTextColorContrastedTo(colorAsHex: string) {
    return (colorAsHex && colorAsHex.length > 6) ? (getContrastYIQ(colorAsHex) < 128 ? 'white' : 'black') : '';
  }

  getIdForTimeRow(startTime: string): string {
    return startTime && startTime.replace(':', '');
  }

  scrollToCurrentTime() {
    const now = moment();
    const scheduleForToday = now.isSame(this.date, 'day');
    if (scheduleForToday) {
      const nearestTimeSlot = this.findTimeSlotNearestTo(now);
      const scrollPosition = this.getIdForTimeRow(nearestTimeSlot);
      const nearestTimeSlotHtmlElement = nearestTimeSlot && this.dayGridElement && this.dayGridElement.nativeElement
        && this.dayGridElement.nativeElement.querySelector(`[id="${scrollPosition}"]`);
      if (nearestTimeSlotHtmlElement) {
        if (this.scrolledPosition !== scrollPosition) {
          this.scrolledPosition = scrollPosition;
          nearestTimeSlotHtmlElement.scrollIntoView();
        }
      }
    }
  }

  private setStreamsFrom(dayAndStreams: DayAndStreams) {
    if (dayAndStreams && dayAndStreams.streams && dayAndStreams.streams.length > 0) {
      if (dayAndStreams.day && dayAndStreams.day.timeSlots) {
        const streamIds: number[] = dayAndStreams.day.timeSlots
          .filter(timeSlot => timeSlot.stream != null)
          .map(timeSlot => timeSlot.stream)
          .reduce((accStreamIds, currentStream) => {
            if (accStreamIds.indexOf(currentStream) === -1) {
              accStreamIds.push(currentStream);
            }
            return accStreamIds;
          }, []);

        this.streams = dayAndStreams.streams
          .filter(stream => streamIds.indexOf(stream.id) !== -1)
          .sort((stream1, stream2) => compareSimpleValues<number>(stream1.id, stream2.id));
      }
    }
  }

  private setGridItemsMap(timeSlots: TimeSlot[]) {
    if (timeSlots) {
      const timeSlotsSortedByStartTimeAndStreamId = [...timeSlots].sort(compareByStartTimeAndStream);
      this.timeSlotGridItemsByStartTimes = {};
      timeSlotsSortedByStartTimeAndStreamId.forEach(timeSlot => {
        const timeSlotAssignedToStream = timeSlot.stream != null;
        const stream = timeSlotAssignedToStream && this.streams.find(currentStream => currentStream.id === timeSlot.stream);
        const bgColor = timeSlotAssignedToStream ? stream.color : '';
        const textColor = this.getTextColorContrastedTo(bgColor);

        this.timeSlotGridItemsByStartTimes[timeSlot.startTime] = this.timeSlotGridItemsByStartTimes[timeSlot.startTime] || [];
        this.timeSlotGridItemsByStartTimes[timeSlot.startTime].push({
          timeSlot,
          colSpan: timeSlotAssignedToStream ? 1 : this.streams.length,
          bgColor,
          textColor
        });
      });

      this.startTimes = Object.getOwnPropertyNames(this.timeSlotGridItemsByStartTimes)
        .sort(compareSimpleValues);
    }
  }

  private findTimeSlotNearestTo(someMoment: Moment) {
    if (someMoment && this.startTimes) {
      return this.startTimes.reduce((previousStartTime, currentStartTime) => {
        const [hour, minutes] = currentStartTime.split(':');
        const startTimeMoment = moment(this.date).hour(+hour).minutes(+minutes);
        return someMoment.isAfter(startTimeMoment) ? currentStartTime : previousStartTime;
      });
    }
  }
}

function getContrastYIQ(hexcolor: string): number {
  const red = parseInt(hexcolor.substr(1, 2), 16);
  const green = parseInt(hexcolor.substr(3, 2), 16);
  const blue = parseInt(hexcolor.substr(5, 2), 16);
  return ((red * 299) + (green * 587) + (blue * 114)) / 1000;
}
