import { NgModule } from '@angular/core';

import { ReturnExchangeRoutingModule } from './return-exchange-routing.module';
import { ReturnExchangeComponent } from './pages/return-exchange/return-exchange.component';

@NgModule({
  declarations: [ReturnExchangeComponent],
  imports: [ReturnExchangeRoutingModule],
})
export class ReturnExchangeModule {}
