import { NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AppNavButtonComponent } from '../../shared/components/nav-button/nav-button.component';
import { INavConst, NAV_CONST } from '../../shared/const/menu-items.const';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from '../../shared/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-private-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    AppNavButtonComponent,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
  ],
})
export class PrivateLayoutComponent implements OnInit {
  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);

  navLinks: INavConst[] = NAV_CONST;

  ngOnInit(): void {
    this._authService.isAuthenticated$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(isAuth => {
        if (!isAuth) {
          this._router.navigate(['/public']);
        }
      });
  }

  onLogoutClick(): void {
    this._authService.logout$().subscribe();
  }
}
