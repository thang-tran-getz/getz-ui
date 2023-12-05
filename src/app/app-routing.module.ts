import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@layout/pages/layout/layout.component';
import { NotFoundComponent } from '@shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./modules/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'delivery',
        loadChildren: () =>
          import('./modules/delivery/delivery.module').then(
            (m) => m.DeliveryModule
          ),
      },
      {
        path: 'policy',
        loadChildren: () =>
          import('./modules/policy/policy.module').then((m) => m.PolicyModule),
      },
      {
        path: 'return-exchange',
        loadChildren: () =>
          import('./modules/return-exchange/return-exchange.module').then(
            (m) => m.ReturnExchangeModule
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'notfound',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
