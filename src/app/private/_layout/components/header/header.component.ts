import { SearchInputComponent } from './../../../../shared/components/search-input/search-input.component';
import { FAKE_PROFILE } from './../../../../shared/const/fake-profile.const';
import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { delay, filter, map, of, startWith, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../../../../shared/services/store.service';
import { ProfileService } from '../../../../shared/services/profile.service';
import { IAppProfieStore } from '../../../../shared/services/profile-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage, SearchInputComponent, ReactiveFormsModule],
  providers: [ProfileService],
})
export class HeaderComponent implements OnInit {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _titleService = inject(Title);
  private _store = inject(StoreService);
  private _destroyRef = inject(DestroyRef);
  private _profileService: ProfileService = inject(ProfileService);

  public form: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

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
  profileData: Signal<IAppProfieStore | undefined> = toSignal(
    this._profileService.profile$
  );

  title = '';

  ngOnInit() {
    this._setFormValueToStore();

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

  private _setFormValueToStore(): void {
    this.form.controls['search'].valueChanges
      .pipe(
        tap(value => this._store.setFormValue('search', value)),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
}
