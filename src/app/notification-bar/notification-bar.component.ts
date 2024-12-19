import { trigger, state, style, transition, animate } from '@angular/animations'
import { Component, EventEmitter, Optional, Inject, InjectionToken, OnDestroy, Output } from '@angular/core';
import { NotificationBarModel, NotificationBarMessage, NotificationBarType } from './notification-bar.model';

import { Subscription } from 'rxjs';
import { NotificationBarService } from './notification-bar.service';

export const NOTIFICATION_BAR_MESSAGES_CONFIG = new InjectionToken('notification-bar.messages.config');

@Component({
  animations: [
    trigger('flyDown', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('600ms ease-in')
      ]),
      transition('* => void', [
        animate('200ms ease-out', style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }))
      ])
    ])
  ],
  selector: 'notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: [ './notification-bar.component.scss' ]
})
export class NotificationBarComponent implements OnDestroy {

notifications: NotificationBarModel[] = [];

 @Output() closed = new EventEmitter<any>();
 @Output() action =  new EventEmitter<any>();

 defaultNotification: NotificationBarModel = {
   action: false,
   actionable: true,
   actionText: 'Learn more',
   autoHide: false,
   closed: false,
   closeable: true,
   hideDelay: 3000,
   hideOnHover: false,
   id: 0,
   isHtml: false,
   message: 'No message',
   type: NotificationBarType.Info,
   typeValue: ''
 }

subscription: Subscription;

constructor(
  private notificationBarService: NotificationBarService,
  @Inject(NOTIFICATION_BAR_MESSAGES_CONFIG) @Optional() private config?: NotificationBarMessage,
) {
  this.subscription = this.notificationBarService.created.subscribe(this.addNotificationBar.bind(this));
}
  ngOnDestroy() {
    this.subscription.unsubscribe;
  }

  addNotificationBar(notificationBar: NotificationBarModel) {
    let newNotificationBar = Object.assign({}, this.defaultNotification, notificationBar);
      if (newNotificationBar) {
        if(newNotificationBar.type) {
            newNotificationBar.typeValue = NotificationBarType[newNotificationBar.type].toLowerCase();
        }

          if (this.config && this.config.messages) {
            if(notificationBar.message) {
                newNotificationBar.message = this.config.messages[notificationBar.message] || notificationBar.message;
            }
          }

          this.notifications.push(newNotificationBar);

          if (newNotificationBar.autoHide) {
              window.setTimeout(() => {
                  this.hideNotification(newNotificationBar);
              }, newNotificationBar.hideDelay);
          }
      }
    
  }

  hideNotification(notificationBar: NotificationBarModel) {
    let index = this.notifications.indexOf(notificationBar);
    this.notifications.splice(index, 1);
  }

  hideOnHover(notificationBar: NotificationBarModel) {
    if (notificationBar.hideOnHover) {
        this.hideNotification(notificationBar);
    }
  }

  onAction(notificationBar: NotificationBarModel, index: number) {
    notificationBar.id = index;
    this.action.emit(notificationBar)
  }

  onClose(notificationBar: NotificationBarModel, index: number) {
    notificationBar.id = index;
    this.hideNotification(notificationBar);
    this.closed.emit(notificationBar);
  }
}
