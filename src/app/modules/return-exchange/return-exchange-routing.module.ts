import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnExchangeComponent } from './pages/return-exchange/return-exchange.component';

const routes: Routes = [
  {
    path: '',
    component: ReturnExchangeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnExchangeRoutingModule {}
