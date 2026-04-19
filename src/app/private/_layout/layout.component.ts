import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NavButtonComponent } from '../../shared/components/nav-button/nav-button.component';
import { INavConst, NAV_CONST } from '../../shared/const/menu-items.const';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-private-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NavButtonComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
})
export class PrivateLayoutComponent {
  navLinks: INavConst[] = NAV_CONST;

  onLogoutClick(): void {
    console.log('onLogoutClick');
  }
}
