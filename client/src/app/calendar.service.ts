import { Injectable } from '@angular/core';
// Importing CalendarOptions from @fullcalendar/angular
// import { CalendarOptions } from '@fullcalendar/angular';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private events: any[] = [];

  getEvents(): any[] {
    return this.events;
  }

  addEvent(event: any): void {
    this.events = [...this.events, event];
  }

  getCalendarOptions(): CalendarOptions {
    return {
      // Other calendar options...
      events: this.events,
    };
  }
  constructor() { }
}
