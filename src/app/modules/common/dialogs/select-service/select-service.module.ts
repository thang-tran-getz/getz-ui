import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectServiceComponent } from './select-service.component';
import { ServiceCardComponent } from './service-card/service-card.component';

@NgModule({
  declarations: [SelectServiceComponent, ServiceCardComponent],
  imports: [CommonModule],
  exports: [SelectServiceComponent],
})
export class SelectServiceModule {}
