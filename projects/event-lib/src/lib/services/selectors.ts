import { Day, DayTo, EventTo, PresenterTo, Schedule, Talks, TimeSlot, TimeSlotTo } from './model';
import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment; // workaround for Rollup

export function selectSchedule(event: EventTo): Schedule {
  if (event) {
    const {agenda, presenters} = event;
    if (agenda) {
      const {days, streams} = agenda;

      return {
        days: createDays(days, presenters),
        streams
      };
    }
  }
}

export function selectTalks(event: EventTo): Talks {
  if (event) {
    const {talks, presenters} = event;
    if (talks) {
      return {
        talks, presenters
      };
    }
  }
}

function selectPresentersByIds(presenterTos: PresenterTo[], presenterIds: number[]) {
  let presenters = [];
  if (presenterTos && presenterIds) {
    presenters = presenterTos.filter(presenterTo => presenterIds.indexOf(presenterTo.id) !== -1);
  }
  return presenters;
}

function createDays(dayTos: DayTo[], presenterTos?: PresenterTo[]): Day[] {
  let days: Day[] = [];

  if (dayTos) {
    days = dayTos
      .map(dayTo => ({
        ...dayTo,
        date: moment(dayTo.date),
        timeSlots: createTimeSlots(dayTo.timeSlots, presenterTos)
      }))
      .sort(compareDaysByDate);
  }

  return days;
}

function createTimeSlots(timeSlotTos: TimeSlotTo[], presenterTos?: PresenterTo[]): TimeSlot[] {
  let timeSlots: TimeSlot[] = [];
  const presenters = presentersOf(presenterTos);

  if (timeSlotTos) {
    timeSlots = timeSlotTos
      .map(timeSlotTo => ({
          ...timeSlotTo,
          isClickable: timeSlotTo.talk != null,
          presenters: presenters.joinNamesOf(timeSlotTo.presenters)
        })
      );
  }

  return timeSlots;
}

function presentersOf(presenterTos?: PresenterTo[]) {
  return {
    joinNamesOf(presenterIds: number[]): string {
      let names = '';
      if (presenterTos) {
        const foundPresenters = presenterTos
          .filter(presenterTo => presenterIds && presenterIds.indexOf(presenterTo.id) !== -1);
        if (foundPresenters) {
          names = foundPresenters.map(presenterTo => presenterTo.name).reduce((previousValue, currentValue) => {
            return previousValue + (previousValue ? ', ' : '') + currentValue;
          }, '');
        }
      }
      return names;
    }
  };
}

export function compareByStartTimeAndStream(timeSlot1: TimeSlot, timeSlot2: TimeSlot): number {
  const startTimeComparisionResult = compareTimeSlotsByStartTime(timeSlot1, timeSlot2);
  return startTimeComparisionResult === 0 ? compareTimeSlotsByStream(timeSlot1, timeSlot2) : startTimeComparisionResult;
}

function compareTimeSlotsByStartTime(timeSlot1: TimeSlot, timeSlot2: TimeSlot): number {
  return compareSimpleValues<string>(timeSlot1.startTime, timeSlot2.startTime);
}

function compareTimeSlotsByStream(timeSlot1: TimeSlot, timeSlot2: TimeSlot): number {
  return compareSimpleValues<number>(timeSlot1.stream, timeSlot2.stream);
}

function compareDaysByDate(day1: Day, day2: Day): number {
  return compare<Moment>(day1.date, day2.date,
    (date1, date2) => date1.isAfter(date2),
    (date1, date2) => date1.isSame(date2));
}

export function compareSimpleValues<T>(value1: T, value2: T) {
  return compare<T>(value1, value2, (val1, val2) => val1 > val2);
}

function compare<T>(value1: T, value2: T,
                    value1IsGreaterThanValue2: (value1: T, value2: T) => boolean,
                    value1IsSameAsValue2?: (value1: T, value2: T) => boolean): number {
  if (value1 === value2
    || (value1 == null && value2 == null)
    || (value1 != null && value2 != null && value1IsSameAsValue2 && value1IsSameAsValue2(value1, value2))) {
    return 0;
  } else if (value2 != null && (value1 == null || value1IsGreaterThanValue2(value1, value2))) {
    return 1;
  } else {
    return -1;
  }
}
