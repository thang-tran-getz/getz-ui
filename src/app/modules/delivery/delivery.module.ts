import { NgModule } from '@angular/core';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryComponent } from './pages/delivery/delivery.component';

@NgModule({
  declarations: [DeliveryComponent],
  imports: [DeliveryRoutingModule],
})
export class DeliveryModule {}
