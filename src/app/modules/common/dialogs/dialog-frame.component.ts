import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-frame',
  templateUrl: './dialog-frame.component.html',
  styleUrls: ['./dialog-frame.component.scss']
})
export class DialogFrameComponent {
  display = false;
  onShow() {
    this.display = true;
  }

  onClose() {
    this.display = false;
  }
}
