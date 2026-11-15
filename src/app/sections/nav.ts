import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { NAV_LINKS, PROFILE } from '../data/portfolio.data';
import { Icon } from '../shared/icon';
import { ThemeService } from '../shared/theme.service';

@Component({
  selector: 'app-nav',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'open.set(false)',
  },
  template: `
    <header class="nav" [class.scrolled]="scrolled()" [class.open]="open()">
      <div class="container inner">
        <a href="#home" class="brand" (click)="open.set(false)" aria-label="Back to top">
          <span class="logo">HP</span>
          <span class="brand-name">{{ profile.firstName }}<span class="dot">.</span></span>
        </a>

        <nav class="links" aria-label="Primary">
          @for (link of links; track link.id) {
            <a
              [href]="'#' + link.id"
              [class.active]="active() === link.id"
              [attr.aria-current]="active() === link.id ? 'true' : null"
              (click)="open.set(false)"
              >{{ link.label }}</a
            >
          }
        </nav>

        <div class="actions">
          <button
            class="icon-btn"
            (click)="theme.toggle()"
            [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          >
            <app-icon [name]="theme.theme() === 'dark' ? 'sun' : 'moon'" [size]="18" />
          </button>
          <a href="#contact" class="hire">Let’s talk</a>
          <button
            class="icon-btn burger"
            (click)="open.set(!open())"
            [attr.aria-expanded]="open()"
            aria-label="Toggle menu"
          >
            <app-icon [name]="open() ? 'close' : 'menu'" [size]="20" />
          </button>
        </div>
      </div>
    </header>
  `,
  styles: `
    .nav {
      position: fixed;
      inset: 0 0 auto 0;
      z-index: 50;
      height: var(--nav-h);
      display: flex;
      align-items: center;
      transition: background-color 0.4s var(--ease), border-color 0.4s var(--ease), backdrop-filter 0.4s;
      border-bottom: 1px solid transparent;
    }
    .nav.scrolled,
    .nav.open {
      background: color-mix(in srgb, var(--bg) 72%, transparent);
      backdrop-filter: blur(18px) saturate(160%);
      -webkit-backdrop-filter: blur(18px) saturate(160%);
      border-color: var(--border);
    }
    .inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.15rem;
    }
    .logo {
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      border-radius: 11px;
      background: var(--grad-1);
      background-size: 200% 200%;
      animation: gradient-pan 6s ease infinite;
      color: #fff;
      font-size: 0.9rem;
      letter-spacing: 0.02em;
      box-shadow: 0 8px 22px -8px rgba(236, 72, 153, 0.7);
    }
    .dot { color: var(--pink); }
    .links {
      display: flex;
      gap: 4px;
      padding: 5px;
      border-radius: 999px;
      background: var(--surface);
      border: 1px solid var(--border);
    }
    .links a {
      position: relative;
      padding: 7px 15px;
      border-radius: 999px;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--muted);
      transition: color 0.25s, background-color 0.25s;
    }
    .links a:hover { color: var(--text); }
    .links a.active {
      color: var(--text);
      background: var(--surface-strong);
      box-shadow: inset 0 0 0 1px var(--border);
    }
    .links a.active::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 2px;
      width: 14px;
      height: 2px;
      border-radius: 2px;
      transform: translateX(-50%);
      background: var(--grad-1);
    }
    .actions { display: flex; align-items: center; gap: 10px; }
    .icon-btn {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--surface);
      border: 1px solid var(--border);
      transition: transform 0.3s var(--ease), background-color 0.3s;
    }
    .icon-btn:hover { transform: rotate(18deg); background: var(--surface-strong); }
    .hire {
      padding: 9px 18px;
      border-radius: 999px;
      font-weight: 600;
      font-size: 0.9rem;
      color: #fff;
      background: var(--grad-1);
      box-shadow: 0 8px 24px -10px rgba(236, 72, 153, 0.8);
      transition: transform 0.3s var(--ease);
    }
    .hire:hover { transform: translateY(-2px); }
    .burger { display: none; }

    @media (max-width: 920px) {
      .burger { display: grid; }
      .hire { display: none; }
      .links {
        position: absolute;
        top: var(--nav-h);
        left: 16px;
        right: 16px;
        flex-direction: column;
        padding: 10px;
        border-radius: 18px;
        background: var(--bg-soft);
        box-shadow: var(--shadow);
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
        transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
      }
      .links a { padding: 12px 16px; font-size: 1rem; }
      .links a.active::after { display: none; }
      .open .links { opacity: 1; transform: none; pointer-events: auto; }
    }
  `,
})
export class Nav {
  protected readonly theme = inject(ThemeService);
  protected readonly profile = PROFILE;
  protected readonly links = NAV_LINKS;
  protected readonly active = signal('home');
  protected readonly scrolled = signal(false);
  protected readonly open = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      this.onScroll();
      const ids = ['home', ...this.links.map((l) => l.id)];
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((s): s is HTMLElement => !!s);
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) this.active.set(e.target.id);
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      sections.forEach((s) => io.observe(s));
      destroyRef.onDestroy(() => io.disconnect());
    });
  }

  protected onScroll(): void {
    const s = window.scrollY > 24;
    if (s !== this.scrolled()) this.scrolled.set(s);
  }
}
