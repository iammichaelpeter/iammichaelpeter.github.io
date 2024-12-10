import { Platform } from '@angular/cdk/platform';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private breakpointObserver = inject(BreakpointObserver);
  private platform = inject(Platform);

  private _isTabletPortrait = signal(false);
  private _isSidenavExpanded = signal(false);
  private _isMobile = signal(false);

  isTabletPortrait = computed(() => this._isTabletPortrait());
  isSidenavExpanded = computed(() => this._isSidenavExpanded());
  isMobile = computed(() => this._isMobile());
  isTouch = computed(() => this.platform.ANDROID || this.platform.IOS);

  constructor() {
    this.breakpointObserver
      .observe([
        Breakpoints.TabletPortrait
      ])
      .pipe(takeUntilDestroyed())
      .subscribe(result => {
        this._isTabletPortrait.set(result.breakpoints[Breakpoints.TabletPortrait]);

        this.updateIsMobile();
      });
  }

  private updateIsMobile(): void {
    const isSmallScreen = this.breakpointObserver.isMatched(Breakpoints.TabletPortrait);
    const newIsMobile = this.isTouch() || isSmallScreen;

    this._isMobile.set(newIsMobile)
    this._isSidenavExpanded.set(false)
  }
}