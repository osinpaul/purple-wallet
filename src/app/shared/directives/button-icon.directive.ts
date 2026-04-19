import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  EmbeddedViewRef,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';

interface AppButtonIconContext {
  $implicit: string;
  active: boolean;
}

@Directive({
  selector: '[appButtonIcon]',
  standalone: true,
})
export class ButtonIconDirective implements OnChanges {
  @Input('appButtonIcon') isActive: boolean | null = null;
  @Input('appButtonIconUrl') url: string | null = null;
  @Input('appButtonIconActiveUrl') activeUrl: string | null = null;

  private _viewRef?: EmbeddedViewRef<AppButtonIconContext>;
  private _tpl: TemplateRef<AppButtonIconContext> = inject(
    TemplateRef<AppButtonIconContext>
  );
  private _vcr: ViewContainerRef = inject(ViewContainerRef);

  constructor() {
    this.createOrUpdateView();
  }

  ngOnChanges(): void {
    this.createOrUpdateView();
  }

  private createOrUpdateView() {
    const current = this.pickCurrentUrl();
    const ctx: AppButtonIconContext = {
      $implicit: current,
      active: !!this.isActive,
    };

    if (!this._viewRef) {
      this._vcr.clear();
      this._viewRef = this._vcr.createEmbeddedView(this._tpl, ctx);
    } else {
      this._viewRef.context.$implicit = current;
      this._viewRef.context.active = !!this.isActive;
      this._viewRef.markForCheck?.();
    }
  }

  private pickCurrentUrl(): string {
    const active = !!this.isActive;
    if (active && this.activeUrl) return this.activeUrl;
    if (!active && this.url) return this.url;
    return (this.activeUrl ?? this.url ?? '') as string;
  }
}
