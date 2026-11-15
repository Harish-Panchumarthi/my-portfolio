import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NAV_LINKS, PROFILE } from '../data/portfolio.data';
import { Icon, IconName } from '../shared/icon';
import { RevealDirective } from '../shared/reveal.directive';
import { TiltDirective } from '../shared/tilt.directive';

interface Channel {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
  copy?: string;
}

@Component({
  selector: 'app-contact',
  imports: [Icon, RevealDirective, TiltDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="section">
      <div class="container">
        <div class="cta glass" appTilt="2" appReveal>
          <div class="mesh" aria-hidden="true"></div>
          <div class="cta-inner">
            <span class="eyebrow">Contact</span>
            <h2 class="section-title">
              Let’s build something <span class="gradient-text">remarkable</span> together.
            </h2>
            <p class="section-sub">
              Modernizing a legacy front-end, scaling to micro frontends, or need a hands-on tech
              lead? I’d love to hear about it.
            </p>

            <div class="channels">
              @for (c of channels(); track c.label; let i = $index) {
                <div class="channel" [appReveal]="120 + i * 70">
                  <span class="ic"><app-icon [name]="c.icon" [size]="20" /></span>
                  <div class="txt">
                    <span class="lbl">{{ c.label }}</span>
                    @if (c.href) {
                      <a
                        [href]="c.href"
                        [attr.target]="c.href.startsWith('http') ? '_blank' : null"
                        rel="noopener"
                        >{{ c.value }}</a
                      >
                    } @else {
                      <span class="val">{{ c.value }}</span>
                    }
                  </div>
                  @if (c.copy) {
                    <button
                      class="copy"
                      (click)="copy(c.copy, c.label)"
                      [attr.aria-label]="'Copy ' + c.label"
                    >
                      <app-icon [name]="copied() === c.label ? 'check' : 'copy'" [size]="16" />
                    </button>
                  }
                </div>
              }
            </div>

            @if (profile.resumeUrl) {
              <a class="btn btn-primary resume" [href]="profile.resumeUrl" download>
                <app-icon name="download" [size]="18" /> Download résumé
              </a>
            }
          </div>
        </div>
      </div>

      <footer class="container footer">
        <div class="brand">
          <span class="logo">HP</span>
          <span>© {{ year }} {{ profile.name }}</span>
        </div>
        <nav aria-label="Footer">
          @for (l of links; track l.id) {
            <a [href]="'#' + l.id">{{ l.label }}</a>
          }
        </nav>
        <span class="built">Crafted with Angular &amp; a lot of ☕</span>
      </footer>

      <div class="toast" [class.show]="!!copied()" role="status" aria-live="polite">
        @if (copied()) {
          <app-icon name="check" [size]="16" /> {{ copied() }} copied
        }
      </div>
    </section>
  `,
  styles: `
    .cta {
      padding: 72px 64px;
      border-radius: 32px;
      overflow: hidden;
    }
    .mesh {
      position: absolute;
      inset: -40%;
      background:
        radial-gradient(30% 40% at 20% 30%, rgba(168, 85, 247, 0.35), transparent 70%),
        radial-gradient(30% 40% at 80% 20%, rgba(6, 182, 212, 0.3), transparent 70%),
        radial-gradient(35% 45% at 70% 80%, rgba(236, 72, 153, 0.32), transparent 70%),
        radial-gradient(30% 40% at 25% 85%, rgba(245, 158, 11, 0.25), transparent 70%);
      animation: spin 50s linear infinite;
      opacity: 0.8;
      pointer-events: none;
    }
    .cta-inner { position: relative; }
    .cta-inner > .section-title,
    .cta-inner > .section-sub { max-width: 760px; }
    .channels {
      margin-top: 40px;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }
    @media (max-width: 820px) {
      .channels { grid-template-columns: minmax(0, 1fr); }
    }
    .channel {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 18px;
      border-radius: 16px;
      background: var(--surface-strong);
      border: 1px solid var(--border);
      backdrop-filter: blur(10px);
    }
    .ic {
      flex: none;
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      border-radius: 12px;
      color: #fff;
      background: var(--grad-1);
    }
    .txt { display: flex; flex-direction: column; min-width: 0; flex: 1; }
    .lbl { font-size: 0.78rem; color: var(--faint); text-transform: uppercase; letter-spacing: 0.08em; }
    .val, .txt a { font-weight: 600; font-size: 1.05rem; overflow-wrap: break-word; }
    .txt a:hover { color: var(--pink); }
    .copy {
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      border-radius: 10px;
      color: var(--muted);
      background: var(--surface);
      border: 1px solid var(--border);
      transition: color 0.2s, transform 0.2s;
    }
    .copy:hover { color: var(--text); transform: scale(1.08); }
    .resume { margin-top: 32px; }

    .footer {
      margin-top: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
      padding-top: 28px;
      border-top: 1px solid var(--border);
      font-size: 0.88rem;
      color: var(--muted);
    }
    .brand { display: flex; align-items: center; gap: 10px; }
    .logo {
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      border-radius: 9px;
      background: var(--grad-1);
      color: #fff;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.72rem;
    }
    .footer nav { display: flex; flex-wrap: wrap; gap: 18px; }
    .footer nav a:hover { color: var(--text); }
    .built { color: var(--faint); }

    .toast {
      position: fixed;
      left: 50%;
      bottom: 28px;
      z-index: 60;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border-radius: 999px;
      background: var(--text);
      color: var(--bg);
      font-weight: 600;
      font-size: 0.9rem;
      transform: translate(-50%, 140%);
      opacity: 0;
      transition: transform 0.4s var(--ease), opacity 0.4s;
      pointer-events: none;
    }
    .toast.show { transform: translate(-50%, 0); opacity: 1; }

    @media (max-width: 720px) {
      .cta { padding: 44px 16px; border-radius: 24px; }
      .channel { padding: 14px; gap: 12px; }
      .val, .txt a { font-size: 0.98rem; }
      .footer { flex-direction: column; text-align: center; }
      .footer nav { justify-content: center; }
    }
  `,
})
export class Contact {
  protected readonly profile = PROFILE;
  protected readonly links = NAV_LINKS;
  protected readonly year = new Date().getFullYear();
  protected readonly copied = signal<string | null>(null);
  private copyTimer: ReturnType<typeof setTimeout> | undefined;

  protected readonly channels = computed<Channel[]>(() => {
    const p = this.profile;
    const list: Channel[] = [];
    if (p.email) {
      list.push({
        icon: 'mail',
        label: 'Email',
        // zero-width space lets narrow screens wrap neatly before the "@"
        value: p.email.replace('@', '​@'),
        href: `mailto:${p.email}`,
        copy: p.email,
      });
    }
    if (p.phone) {
      list.push({
        icon: 'phone',
        label: 'Phone',
        value: p.phone,
        href: `tel:+1${p.phone.replace(/\D/g, '')}`,
        copy: p.phone,
      });
    }
    if (p.linkedin) {
      list.push({ icon: 'linkedin', label: 'LinkedIn', value: p.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: p.linkedin });
    }
    if (p.github) {
      list.push({ icon: 'github', label: 'GitHub', value: p.github.replace(/^https?:\/\/(www\.)?/, ''), href: p.github });
    }
    list.push({ icon: 'pin', label: 'Location', value: p.location });
    return list;
  });

  protected async copy(text: string, label: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(label);
      clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(() => this.copied.set(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }
}
