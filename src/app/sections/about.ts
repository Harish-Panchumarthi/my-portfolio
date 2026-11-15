import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ABOUT, PROFILE, SERVICES } from '../data/portfolio.data';
import { Icon } from '../shared/icon';
import { RevealDirective } from '../shared/reveal.directive';
import { TiltDirective } from '../shared/tilt.directive';

@Component({
  selector: 'app-about',
  imports: [Icon, RevealDirective, TiltDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="section">
      <div class="container">
        <div class="intro">
          <div class="avatar-wrap" appReveal>
            <div class="avatar">
              <span class="ring"></span>
              <span class="initials">HP</span>
            </div>
            <ul class="facts glass">
              @for (f of about.facts; track f.label) {
                <li>
                  <span>{{ f.label }}</span>
                  <strong>{{ f.value }}</strong>
                </li>
              }
            </ul>
          </div>

          <div class="bio">
            <span class="eyebrow" appReveal>About me</span>
            <h2 class="section-title" appReveal="80">
              Building front-ends that are <span class="gradient-text">fast</span>,
              <span class="gradient-text-2">scalable</span> &amp; a joy to maintain.
            </h2>
            @for (p of about.paragraphs; track $index) {
              <p class="para" [appReveal]="140 + $index * 60">{{ p }}</p>
            }
          </div>
        </div>

        <div class="services">
          @for (s of services; track s.title; let i = $index) {
            <article class="service glass" appTilt [appReveal]="i * 70" [style.--c]="s.color">
              <span class="icon"><app-icon [name]="s.icon" [size]="22" /></span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .intro {
      display: grid;
      grid-template-columns: 360px 1fr;
      gap: 72px;
      align-items: start;
    }
    .avatar-wrap { position: sticky; top: calc(var(--nav-h) + 24px); }
    .avatar {
      position: relative;
      aspect-ratio: 1;
      width: 100%;
      max-width: 320px;
      margin: 0 auto;
      display: grid;
      place-items: center;
    }
    .ring {
      position: absolute;
      inset: 0;
      border-radius: 36% 64% 58% 42% / 42% 38% 62% 58%;
      background: conic-gradient(from 0deg, #a855f7, #ec4899, #f59e0b, #06b6d4, #6366f1, #a855f7);
      animation: morph 12s ease-in-out infinite, spin 18s linear infinite;
      filter: saturate(1.1);
    }
    .ring::after {
      content: '';
      position: absolute;
      inset: 6px;
      border-radius: inherit;
      background: var(--bg-soft);
    }
    .initials {
      position: relative;
      font-family: var(--font-display);
      font-size: 5.5rem;
      font-weight: 700;
      background: var(--grad-1);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .facts {
      list-style: none;
      margin: 28px 0 0;
      padding: 8px 20px;
    }
    .facts li {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      padding: 12px 0;
      border-bottom: 1px solid var(--border);
      font-size: 0.92rem;
    }
    .facts li:last-child { border-bottom: 0; }
    .facts span { color: var(--muted); }
    .facts strong { text-align: right; font-weight: 600; }
    .bio { padding-top: 12px; }
    .para {
      margin-top: 22px;
      font-size: 1.08rem;
      color: var(--muted);
    }
    .para:first-of-type { margin-top: 30px; color: var(--text); font-size: 1.2rem; }

    .services {
      margin-top: 96px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .service {
      padding: 30px 28px;
    }
    .service::after {
      content: '';
      position: absolute;
      left: 28px;
      right: 28px;
      top: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--c), transparent);
      opacity: 0.8;
    }
    .icon {
      display: grid;
      place-items: center;
      width: 50px;
      height: 50px;
      border-radius: 14px;
      color: var(--c);
      background: color-mix(in srgb, var(--c) 16%, transparent);
      border: 1px solid color-mix(in srgb, var(--c) 35%, transparent);
      margin-bottom: 22px;
      transition: transform 0.4s var(--ease);
    }
    .service:hover .icon { transform: scale(1.08) rotate(-6deg); }
    .service h3 { font-size: 1.2rem; margin-bottom: 10px; }
    .service p { color: var(--muted); font-size: 0.95rem; }

    @keyframes morph {
      0%, 100% { border-radius: 36% 64% 58% 42% / 42% 38% 62% 58%; }
      50% { border-radius: 58% 42% 36% 64% / 60% 54% 46% 40%; }
    }

    @media (max-width: 980px) {
      .intro { grid-template-columns: 1fr; gap: 48px; }
      .avatar-wrap { position: static; max-width: 420px; }
      .avatar { max-width: 220px; }
      .initials { font-size: 4rem; }
      .services { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .services { grid-template-columns: 1fr; margin-top: 64px; }
    }
  `,
})
export class About {
  protected readonly about = ABOUT;
  protected readonly profile = PROFILE;
  protected readonly services = SERVICES;
}
