import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STATS, WINS } from '../data/portfolio.data';
import { Counter } from '../shared/counter';
import { RevealDirective } from '../shared/reveal.directive';
import { TiltDirective } from '../shared/tilt.directive';

@Component({
  selector: 'app-impact',
  imports: [Counter, RevealDirective, TiltDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="impact" class="section">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow" appReveal>Impact</span>
          <h2 class="section-title" appReveal="80">
            Numbers that <span class="gradient-text">moved the needle</span>
          </h2>
          <p class="section-sub" appReveal="140">
            Measurable outcomes from leading platform modernization at enterprise scale.
          </p>
        </div>

        <div class="stats">
          @for (s of stats; track s.label; let i = $index) {
            <div class="stat glass" appTilt [appReveal]="i * 60" [style.--c]="s.color">
              <span class="value">
                <app-counter [to]="s.value" [prefix]="s.prefix ?? ''" [suffix]="s.suffix ?? ''" />
              </span>
              <span class="label">{{ s.label }}</span>
              <span class="glow"></span>
            </div>
          }
        </div>

        <h3 class="wins-title" appReveal>Before &amp; after</h3>
        <div class="wins">
          @for (w of wins; track w.title; let i = $index) {
            <article class="win glass" appTilt="3" [appReveal]="i * 90">
              <h4>{{ w.title }}</h4>
              <p class="ctx">{{ w.context }}</p>
              <div class="bars">
                <div class="bar-row">
                  <span class="tag">Before</span>
                  <div class="bar"><span class="fill before"></span></div>
                  <span class="val muted">{{ w.before }}</span>
                </div>
                <div class="bar-row">
                  <span class="tag">After</span>
                  <div class="bar">
                    <span class="fill after" [style.--w]="w.ratio + '%'" [style.background]="w.gradient"></span>
                  </div>
                  <span class="val strong">{{ w.after }}</span>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .stat {
      padding: 32px 30px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .value {
      font-family: var(--font-display);
      font-size: clamp(2.6rem, 5vw, 3.6rem);
      font-weight: 700;
      line-height: 1;
      color: var(--c);
      font-variant-numeric: tabular-nums;
    }
    .label { color: var(--muted); font-size: 0.98rem; }
    .glow {
      position: absolute;
      right: -40px;
      bottom: -40px;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: var(--c);
      filter: blur(60px);
      opacity: 0.28;
      pointer-events: none;
      transition: opacity 0.4s;
    }
    .stat:hover .glow { opacity: 0.5; }

    .wins-title {
      margin: 88px 0 28px;
      font-size: 1.5rem;
      text-align: center;
    }
    .wins {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .win { padding: 30px 28px; }
    .win h4 { font-size: 1.2rem; }
    .ctx { margin-top: 8px; color: var(--muted); font-size: 0.92rem; min-height: 3em; }
    .bars { margin-top: 26px; display: grid; gap: 16px; }
    .bar-row {
      display: grid;
      grid-template-columns: 54px 1fr 72px;
      align-items: center;
      gap: 12px;
    }
    .tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--faint);
    }
    .bar {
      height: 10px;
      border-radius: 99px;
      background: var(--surface-strong);
      overflow: hidden;
    }
    .fill {
      display: block;
      height: 100%;
      border-radius: inherit;
      width: 0;
      transition: width 1.6s var(--ease) 0.3s;
    }
    .fill.before { background: var(--faint); opacity: 0.6; }
    .win.in .fill.before { width: 100%; }
    .win.in .fill.after { width: max(var(--w), 4%); transition-delay: 0.9s; }
    .val { text-align: right; font-family: var(--font-display); font-size: 0.98rem; }
    .muted { color: var(--muted); }
    .strong { font-weight: 700; }

    @media (max-width: 980px) {
      .stats, .wins { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .stats { grid-template-columns: 1fr 1fr; gap: 12px; }
      .stat { padding: 22px 18px; }
      .label { font-size: 0.85rem; }
      .wins { grid-template-columns: 1fr; }
    }
  `,
})
export class Impact {
  protected readonly stats = STATS;
  protected readonly wins = WINS;
}
