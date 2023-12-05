import { NgModule } from '@angular/core';
import { PolicyComponent } from '@policy/pages/policy/policy.component';
import { PolicyRoutingModule } from '@policy/policy-routing.module';

@NgModule({
  imports: [PolicyRoutingModule],
  declarations: [PolicyComponent],
})
export class PolicyModule {}
