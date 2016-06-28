import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';
// import { AlertBroadcaster } from './alert-event-broadcaster';

const ALERT_TEMPLATE = `
  <div class="alert" role="alert" [ngClass]="classes" *ngIf="!closed">
    <button *ngIf="dismissible" type="button" class="close" (click)="onClose()" (touch)="onClose()">
      <span aria-hidden="true">&times;</span>
      <span class="sr-only">Close</span>
    </button>
    <ng-content></ng-content>
  </div>
  `;
@Component({
  selector: 'alert',
  template: ALERT_TEMPLATE
})
export class AlertComponent implements OnInit {
  @Input() public type: string = 'warning';
  @Input() public dismissible: boolean;
  @Input() public dismissOnTimeout: number;

  @Output() public close: EventEmitter<AlertComponent> = new EventEmitter(false);

  private closed: boolean;
  private classes: Array<string> = [];

  public ngOnInit(): any {
    console.log('this.type', this.type);
    this.classes[0] = `alert-${this.type}`;
    if (this.dismissible) {
      this.classes[1] = 'alert-dismissible';
    } else {
      this.classes.length = 1;
    }

    if (this.dismissOnTimeout) {
      setTimeout(() => this.onClose(), this.dismissOnTimeout);
    }
  }

  // todo: mouse event + touch + pointer
  public onClose(): void {
    this.closed = true;
    this.close.emit(this);
  }
}

/**
 *  it may require in future
 */

// const GLOBAL_ALERT_TEMPLATE = `<alert *ngFor="#alert of alerts; #i = index" [type]="alert.type" dismissible="true" dismissOnTimeout="4000" (close)="closeAlert(i)">
//   {{ alert?.msg }}
// </alert>`;
// @Component({
//   selector: 'global-alert',
//   template: GLOBAL_ALERT_TEMPLATE,
//   pipes: [DisplayFilterPipe],
//   directives: [AlertComponent]
// })
// export class GlobalAlertComponent implements OnInit {
//   public alerts: Array<Object> = [
//     {
//       type: 'danger',
//       msg: 'Oh snap! Change a few things up and try submitting again.'
//     },
//     {
//       type: 'success',
//       msg: 'Well done! You successfully read this important alert message.',
//       closable: true
//     }
//   ];

//   public closeAlert(i: number): void {
//     this.alerts.splice(i, 1);
//   }

//   public addAlert(): void {
//     this.alerts.push({msg: 'Another alert!', type: 'warning', closable: true});
//   }

//   ngOnInit() {
//     AlertBroadcaster.setWatchOnAlertEvent((alertObject) => {
//       this.alerts.push(alertObject);
//     });
//   }

// }
