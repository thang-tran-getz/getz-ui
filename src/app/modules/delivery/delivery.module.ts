import { NgModule } from '@angular/core';
import { DeliveryRoutingModule } from '@delivery/delivery-routing.module';
import { DeliveryComponent } from '@delivery/pages/delivery/delivery.component';

@NgModule({
  declarations: [DeliveryComponent],
  imports: [DeliveryRoutingModule],
})
export class DeliveryModule {}
