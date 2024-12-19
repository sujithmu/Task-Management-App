export interface NotificationBarMessageConfig {
    [when: string]: string;
  }
  
  export enum NotificationBarType { Error, Info, Success, Warning }
  
  export interface NotificationBarMessage {
    messages?: NotificationBarMessageConfig;
  }
  
  export interface NotificationBarModel {
    action?: boolean,
    actionable?: boolean,
    actionText?: string,
    autoHide?: boolean;
    closed?: boolean,
    closeable?: boolean;
    hideDelay?: number;
    hideOnHover?: boolean;
    id?: number,
    isHtml?: boolean;
    message?: string;
    type?: NotificationBarType;
    typeValue?: string;
  }
  
  