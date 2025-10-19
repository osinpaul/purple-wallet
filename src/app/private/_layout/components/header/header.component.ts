import { SearchInputComponent } from './../../../../shared/components/search-input/search-input.component';
import { FAKE_PROFILE } from './../../../../shared/const/fake-profile.const';
import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { delay, filter, map, of, startWith, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { IUserModel } from '../../../../shared/models/user.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage, SearchInputComponent],
})
export class HeaderComponent implements OnInit {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _titleService = inject(Title);
  private _destroyRef = inject(DestroyRef);

  isShowSearch: Signal<boolean> = toSignal(
    this._router.events.pipe(
      startWith(null),
      filter(e => e === null || e instanceof NavigationEnd),
      map(() => {
        let r: ActivatedRoute | null = this._activatedRoute;
        while (r?.firstChild) r = r.firstChild;
        return r!;
      }),
      switchMap(r => r['data']),
      map(v => v['isShowSearch'] ?? false)
    )
  );
  profileData: Signal<IUserModel | undefined> = toSignal(
    of(FAKE_PROFILE).pipe(delay(1000))
  );

  title = '';

  ngOnInit() {
    this.title = this._titleService.getTitle();
    this._router.events
      .pipe(
        delay(100),
        tap(event => {
          if (event instanceof NavigationEnd) {
            this.title = this._titleService.getTitle();
          }
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
}
