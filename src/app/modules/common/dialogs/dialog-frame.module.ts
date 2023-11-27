import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogFrameComponent } from './dialog-frame.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [DialogFrameComponent],
  imports: [CommonModule, DialogModule, ButtonModule],
  exports: [DialogFrameComponent],
})
export class DialogFrameModule {}
