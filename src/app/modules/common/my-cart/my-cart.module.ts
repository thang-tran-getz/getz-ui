import { NgModule } from '@angular/core';
import { MyCartComponent } from '@common/my-cart/my-cart.component';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { RewardItemComponent } from '@common/my-cart/reward-item/reward-item.component';
import { CartItemComponent } from '@common/my-cart/cart-item/cart-item.component';
import { SelectServiceModule } from '@common/dialogs/select-service/select-service.module';
import { DialogDynamicModule } from '@app/modules/common/dialogs/dialog-dynamic.module';
import { DialogDynamicService } from '../dialogs/dialog-dynamic.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MyCartComponent, RewardItemComponent, CartItemComponent],
  imports: [
    PanelModule,
    ButtonModule,
    DividerModule,
    InputNumberModule,
    FormsModule,
    DialogDynamicModule,
    SelectServiceModule,
    TranslateModule.forChild(),
  ],
  providers: [DialogDynamicService],
  exports: [MyCartComponent],
})
export class MyCartModule {}
