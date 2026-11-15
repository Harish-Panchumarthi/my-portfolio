import { DOCUMENT, Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'hp-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly theme = signal<Theme>(
    (this.doc.documentElement.getAttribute('data-theme') as Theme | null) ?? 'dark',
  );

  constructor() {
    effect(() => {
      const t = this.theme();
      this.doc.documentElement.setAttribute('data-theme', t);
      this.doc
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', t === 'dark' ? '#07070f' : '#f6f5ff');
      try {
        localStorage.setItem(STORAGE_KEY, t);
      } catch {
        /* storage unavailable — theme still applies for this visit */
      }
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }
}
