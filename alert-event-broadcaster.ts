import { EventEmitter } from 'angular2/core';

/**
 * Its a pure static class..  which has load-mask-event as
 * a static property which can be set by  using the setLoadMask method from
 * any point of the app
 */
export class AlertBroadcaster {
  /**
   * [loadMaskControlEvent]
   * @type {EventEmitter}
   */
  public static alertControlEvent = new EventEmitter<any>();

  /**
   * [setLoadMask]
   * @param {string = 'hide'} value
   */
  public static pushAlert(alert: AlertOptions) {
    AlertBroadcaster.alertControlEvent.next(alert);
  };

  /**
   * [setWatchOnLoadMaskEvent]
   * @param {Function} callback
   */
  public static setWatchOnAlertEvent(callback) {
    AlertBroadcaster.alertControlEvent.subscribe(
      val => {
        callback(val);
      });
  };
}

export interface AlertOptions {
  type?: string;
  msg?: string;
}
