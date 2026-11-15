import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AWARDS, CERTIFICATIONS, EDUCATION, TALKS } from '../data/portfolio.data';
import { Icon } from '../shared/icon';
import { RevealDirective } from '../shared/reveal.directive';
import { TiltDirective } from '../shared/tilt.directive';

@Component({
  selector: 'app-recognition',
  imports: [Icon, RevealDirective, TiltDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="recognition" class="section">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow" appReveal>Recognition</span>
          <h2 class="section-title" appReveal="80">
            Education, awards &amp; <span class="gradient-text">credentials</span>
          </h2>
        </div>

        <div class="bento">
          <article class="tile award-hero glass" appTilt appReveal>
            <span class="trophy"><app-icon name="award" [size]="34" [stroke]="1.6" /></span>
            <span class="kicker">{{ awards[0].org }} · {{ awards[0].year }}</span>
            <h3>{{ awards[0].title }}</h3>
            <p>Recognized by Capgemini for exceptional delivery and technical leadership.</p>
            <div class="confetti" aria-hidden="true">
              @for (c of confetti; track $index) {
                <span [style.--x]="c.x" [style.--d]="c.d" [style.--h]="c.h"></span>
              }
            </div>
          </article>

          <article class="tile glass client" appTilt [appReveal]="80">
            <span class="ic" style="--c: #06b6d4"><app-icon name="sparkles" [size]="22" /></span>
            <h3>{{ awards[1].title }} · {{ awards[1].org }}</h3>
            <p>{{ awards[1].note }}</p>
          </article>

          @for (e of education; track e.school; let i = $index) {
            <article class="tile glass edu" appTilt [appReveal]="120 + i * 60">
              <span class="ic" [style.--c]="i === 0 ? '#a855f7' : '#f59e0b'">
                <app-icon name="cap" [size]="22" />
              </span>
              <h3>{{ e.degree }}</h3>
              <p class="school">{{ e.school }}</p>
              <p class="place"><app-icon name="pin" [size]="13" />{{ e.place }}</p>
            </article>
          }

          <article class="tile glass list-tile" appTilt [appReveal]="160">
            <span class="ic" style="--c: #10b981"><app-icon name="check" [size]="22" /></span>
            <h3>Certifications</h3>
            <ul>
              @for (c of certs; track c) {
                <li>{{ c }}</li>
              }
            </ul>
          </article>

          <article class="tile glass list-tile" appTilt [appReveal]="200">
            <span class="ic" style="--c: #ec4899"><app-icon name="mic" [size]="22" /></span>
            <h3>Seminars &amp; publications</h3>
            <ul>
              @for (t of talks; track t) {
                <li>{{ t }}</li>
              }
            </ul>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: `
    .bento {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
    .tile { padding: 28px; }
    .award-hero {
      grid-column: span 2;
      grid-row: span 2;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      min-height: 340px;
      background:
        radial-gradient(120% 80% at 100% 0%, rgba(245, 158, 11, 0.28), transparent 60%),
        radial-gradient(100% 80% at 0% 100%, rgba(236, 72, 153, 0.26), transparent 60%),
        var(--surface);
    }
    .trophy {
      position: absolute;
      top: 28px;
      left: 28px;
      display: grid;
      place-items: center;
      width: 72px;
      height: 72px;
      border-radius: 22px;
      color: #fff;
      background: var(--grad-1);
      box-shadow: 0 16px 40px -12px rgba(245, 158, 11, 0.7);
      animation: wiggle 5s ease-in-out infinite;
    }
    .kicker {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--amber);
    }
    .award-hero h3 {
      margin-top: 8px;
      font-size: clamp(2.2rem, 4vw, 3.2rem);
      background: var(--grad-1);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .award-hero p { margin-top: 10px; color: var(--muted); max-width: 380px; }
    .confetti { position: absolute; inset: 0; pointer-events: none; overflow: hidden; border-radius: inherit; }
    .confetti span {
      position: absolute;
      top: -12px;
      left: var(--x);
      width: 7px;
      height: 12px;
      border-radius: 2px;
      background: hsl(var(--h) 90% 62%);
      opacity: 0.85;
      animation: fall 7s linear infinite;
      animation-delay: var(--d);
    }
    .client { grid-column: span 2; }
    .ic {
      display: grid;
      place-items: center;
      width: 46px;
      height: 46px;
      border-radius: 13px;
      margin-bottom: 18px;
      color: var(--c);
      background: color-mix(in srgb, var(--c) 15%, transparent);
      border: 1px solid color-mix(in srgb, var(--c) 35%, transparent);
    }
    h3 { font-size: 1.15rem; }
    .tile > p { margin-top: 8px; color: var(--muted); font-size: 0.94rem; }
    .school { color: var(--text) !important; font-weight: 500; }
    .place { display: flex; align-items: center; gap: 6px; font-size: 0.85rem !important; color: var(--faint) !important; }
    .list-tile { grid-column: span 2; }
    .list-tile ul { margin: 12px 0 0; padding: 0; list-style: none; display: grid; gap: 8px; }
    .list-tile li {
      position: relative;
      padding-left: 18px;
      color: var(--muted);
      font-size: 0.93rem;
    }
    .list-tile li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.6em;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--grad-1);
    }
    @keyframes fall {
      0% { transform: translateY(0) rotate(0); opacity: 0; }
      10% { opacity: 0.9; }
      100% { transform: translateY(380px) rotate(540deg); opacity: 0; }
    }
    @keyframes wiggle {
      0%, 100% { transform: rotate(0); }
      10% { transform: rotate(-8deg); }
      20% { transform: rotate(6deg); }
      30% { transform: rotate(0); }
    }
    @media (max-width: 980px) {
      .bento { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .bento { grid-template-columns: 1fr; }
      .award-hero, .client, .list-tile { grid-column: auto; grid-row: auto; }
      .award-hero { min-height: 300px; }
    }
  `,
})
export class Recognition {
  protected readonly awards = AWARDS;
  protected readonly education = EDUCATION;
  protected readonly certs = CERTIFICATIONS;
  protected readonly talks = TALKS;
  protected readonly confetti = Array.from({ length: 18 }, (_, i) => ({
    x: `${(i * 37) % 100}%`,
    d: `${-((i * 0.83) % 7).toFixed(2)}s`,
    h: (i * 47) % 360,
  }));
}
