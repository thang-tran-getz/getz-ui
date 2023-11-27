import { NgModule } from '@angular/core';
import { PolicyComponent } from './pages/policy/policy.component';
import { PolicyRoutingModule } from './policy-routing.module';

@NgModule({
  imports: [PolicyRoutingModule],
  declarations: [PolicyComponent],
})
export class PolicyModule {}
