import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppNavButtonComponent } from '../../shared/components/nav-button/nav-button.component';

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
];

@Component({
  selector: 'app-private-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, AppNavButtonComponent, RouterLink],
})
export class PrivateLayoutComponent {
  navLinks: INavConst[] = NAV_CONST;
}
