import { DashboardComponent } from './private/pages/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './public/_layout/layout.component';
import { PrivateLayoutComponent } from './private/_layout/layout.component';
import { LogInComponent } from './public/pages/log-in/log-in.component';
import { authGuard } from './shared/guard/auth.guard';
import { AssetsComponent } from './private/pages/assets/assets.component';
import { ExchangeComponent } from './private/pages/exchange/exchange.component';
import { RatesComponent } from './private/pages/rates/rates.component';

export const routes: Routes = [
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'log-in',
        component: LogInComponent,
        title: 'Авторизация',
      },
      {
        path: '**',
        redirectTo: 'log-in',
      },
    ],
  },
  {
    path: 'private',
    component: PrivateLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Главная',
        data: {
          isShowSearch: false,
        },
      },
      {
        path: 'assets',
        component: AssetsComponent,
        title: 'Мои ассеты',
        data: {
          isShowSearch: false,
        },
      },
      {
        path: 'exchange',
        component: ExchangeComponent,
        title: 'Обмен',
        data: {
          isShowSearch: false,
        },
      },
      {
        path: 'rates',
        component: RatesComponent,
        title: 'Курсы валют',
        data: {
          isShowSearch: true,
        },
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'public',
  },
];
