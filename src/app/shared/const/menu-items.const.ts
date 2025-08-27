export interface INavConst {
  text: string;
  iconUrl: string;
  iconUrlActive: string;
  link: string;
  id: string;
}

export const NAV_CONST: INavConst[] = [
  {
    text: 'Главная',
    iconUrl: 'menu/dashboard.svg',
    iconUrlActive: 'menu/dashboard-active.svg',
    link: '/private/dashboard',
    id: 'dashboard',
  },
  {
    text: 'Мои монеты',
    iconUrl: 'menu/wallet.svg',
    iconUrlActive: 'menu/wallet-active.svg',
    link: '/private/assets',
    id: 'wallet',
  },
  {
    text: 'Курсы',
    iconUrl: 'menu/rates.svg',
    iconUrlActive: 'menu/rates-active.svg',
    link: '/private/rates',
    id: 'rates',
  },
  {
    text: 'Обмен',
    iconUrl: 'menu/exchange.svg',
    iconUrlActive: 'menu/exchange-active.svg',
    link: '/private/exchange',
    id: 'exchange',
  },
];
