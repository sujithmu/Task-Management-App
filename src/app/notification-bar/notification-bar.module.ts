import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationBarMessage } from './notification-bar.model';
import { NotificationBarService } from './notification-bar.service';
import { NotificationBarComponent, NOTIFICATION_BAR_MESSAGES_CONFIG } from './notification-bar.component';

declare module "@angular/core" {
    interface ModuleWithProviders<T = any> {
      ngModule: Type<T>;
    //   providers?: Provider[];
    }
  }

@NgModule({
    imports:      [
        CommonModule
    ],
    declarations: [ NotificationBarComponent ],
    providers: [ NotificationBarService ],
    exports: [ NotificationBarComponent ]
})
export class NotificationBarModule {

    static forRoot(config: NotificationBarMessage): ModuleWithProviders {
        return {
            ngModule: NotificationBarModule,
            providers: [
                { provide: NOTIFICATION_BAR_MESSAGES_CONFIG, useValue: config }
            ]
        };
    }
}