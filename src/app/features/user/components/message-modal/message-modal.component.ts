import { Component } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  template: `
    <div class="send-message">
      Cambios Guardados <mat-icon>done_outline</mat-icon>
    </div>`,
  styles: [
    `
      .send-message {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }

      mat-icon {
        color: #4caf50;
      }
    `
  ]
})
export class MessageModalComponent {

}
