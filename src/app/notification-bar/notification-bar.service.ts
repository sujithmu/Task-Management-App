import { Injectable, EventEmitter } from '@angular/core';
import { NotificationBarType } from './notification-bar.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationBarService {
  created = new EventEmitter<NotificationBarType>();

  constructor() {}

  create(notificationBar: NotificationBarType) {
    this.created.emit(notificationBar);
  }
}
