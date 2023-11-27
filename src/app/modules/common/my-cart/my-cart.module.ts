import { NgModule } from '@angular/core';
import { MyCartComponent } from './my-cart.component';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { RewardItemComponent } from './reward-item/reward-item.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { SelectServiceModule } from '../dialogs/select-service/select-service.module';
import { DialogFrameModule } from '../dialogs/dialog-frame.module';

@NgModule({
  declarations: [MyCartComponent, RewardItemComponent, CartItemComponent],
  imports: [
    PanelModule,
    ButtonModule,
    DividerModule,
    InputNumberModule,
    FormsModule,
    DialogFrameModule,
    SelectServiceModule,
  ],
  providers: [],
  exports: [MyCartComponent],
})
export class MyCartModule {}
