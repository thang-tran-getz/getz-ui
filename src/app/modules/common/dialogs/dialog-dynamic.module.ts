import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDynamicComponent } from './dialog-dynamic.component';
import { DialogDynamicContent } from './dialog-dynamic-content';
import { WindowMaximizeIcon } from 'primeng/icons/windowmaximize';
import { WindowMinimizeIcon } from 'primeng/icons/windowminimize';
import { TimesIcon } from 'primeng/icons/times';
import { ArrowLeftIcon } from 'primeng/icons/arrowleft';

@NgModule({
  imports: [
    CommonModule,
    WindowMaximizeIcon,
    WindowMinimizeIcon,
    TimesIcon,
    ArrowLeftIcon,
  ],
  declarations: [DialogDynamicComponent, DialogDynamicContent],
})
export class DialogDynamicModule {}