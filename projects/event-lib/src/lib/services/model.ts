import { Moment } from 'moment';

export interface Schedule {
  days: Day[];
  streams?: StreamTo[];
}

export interface Day {
  id: number;
  date: Moment;
  name?: string;
  description?: string;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  presenters?: string;
  stream?: number;
  description?: string;
  room?: string;
  isBreak?: boolean;
}

// server model

export interface EventTo {
  agenda: AgendaTo;
  presenters: PresenterTo[];
}

export interface AgendaTo {
  days: DayTo[];
  streams?: StreamTo[];
}

export interface DayTo {
  id: number;
  name: string;
  date: string;
  description?: string;
  timeSlots: TimeSlotTo[];
}

export interface TimeSlotTo {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  presenters?: number[];
  stream?: number;
  description?: string;
  room?: string;
  isBreak?: boolean;
}

export interface PresenterTo {
  id: number;
  name: string;
  position?: string;
  description?: string;
  organization?: string;
}

export interface StreamTo {
  id: number;
  name: string;
  color: string;
}
