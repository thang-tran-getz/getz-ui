import { Component, ViewChild } from '@angular/core';
import { DialogFrameComponent } from '../dialogs/dialog-frame.component';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
})
export class MyCartComponent {
  @ViewChild(DialogFrameComponent, {read: DialogFrameComponent, static: true}) public dialogComponent!: DialogFrameComponent;
  loading = false;
  
  constructor() {}

  load() {
    this.loading = true;
    setTimeout(() => (this.loading = false), 1000);
  }

  selectServices() {
    this.dialogComponent.onShow();
  }
}
