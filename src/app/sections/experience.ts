import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EXPERIENCE } from '../data/portfolio.data';
import { Icon } from '../shared/icon';
import { RevealDirective } from '../shared/reveal.directive';
import { TiltDirective } from '../shared/tilt.directive';

const PREVIEW = 3;

@Component({
  selector: 'app-experience',
  imports: [Icon, RevealDirective, TiltDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow" appReveal>Experience</span>
          <h2 class="section-title" appReveal="80">
            A decade+ of <span class="gradient-text">shipping at scale</span>
          </h2>
          <p class="section-sub" appReveal="140">
            From telecom portals to Wall-Street-grade liquidity reporting — select a role to see the
            full story.
          </p>
        </div>

        <ol class="timeline">
          @for (job of jobs; track job.company; let i = $index) {
            <li class="item" [style.--c]="job.color" appReveal>
              <span class="node" [class.live]="job.current"></span>

              <article class="card glass" appTilt="0" [class.expanded]="isOpen(i)">
                <header class="head">
                  <div class="who">
                    <span class="badge">{{ job.company.charAt(0) }}</span>
                    <div>
                      <h3>{{ job.role }}</h3>
                      <p class="company">
                        <strong>{{ job.company }}</strong>
                        @if (job.via) {
                          <span class="via">via {{ job.via }}</span>
                        }
                      </p>
                    </div>
                  </div>
                  <div class="when">
                    <span class="period">
                      @if (job.current) {
                        <span class="now">Now</span>
                      }
                      {{ job.period }}
                    </span>
                    @if (job.location) {
                      <span class="loc"><app-icon name="pin" [size]="13" />{{ job.location }}</span>
                    }
                  </div>
                </header>

                @if (job.project) {
                  <p class="project"><app-icon name="briefcase" [size]="14" />{{ job.project }}</p>
                }
                <p class="summary">{{ job.summary }}</p>

                <ul class="highlights">
                  @for (h of job.highlights; track $index) {
                    @if (isOpen(i) || $index < preview) {
                      <li>{{ h }}</li>
                    }
                  }
                </ul>

                @if (job.highlights.length > preview) {
                  <button class="more" (click)="toggle(i)" [attr.aria-expanded]="isOpen(i)">
                    {{ isOpen(i) ? 'Show less' : 'Show all ' + job.highlights.length + ' highlights' }}
                    <app-icon name="chevron" [size]="16" [class.flip]="isOpen(i)" />
                  </button>
                }

                <div class="tech">
                  @for (t of job.tech; track t) {
                    <span class="chip">{{ t }}</span>
                  }
                </div>
              </article>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .timeline {
      position: relative;
      list-style: none;
      margin: 0;
      padding: 0 0 0 48px;
    }
    .timeline::before {
      content: '';
      position: absolute;
      left: 15px;
      top: 8px;
      bottom: 8px;
      width: 2px;
      border-radius: 2px;
      background: linear-gradient(180deg, #a855f7, #ec4899, #f59e0b, #06b6d4, #6366f1, #10b981);
      opacity: 0.6;
    }
    .item { position: relative; padding-bottom: 28px; }
    .item:last-child { padding-bottom: 0; }
    .node {
      position: absolute;
      left: -41px;
      top: 34px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--bg);
      border: 3px solid var(--c);
      box-shadow: 0 0 0 5px color-mix(in srgb, var(--c) 18%, transparent);
    }
    .node.live::after {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      border: 2px solid var(--c);
      animation: ripple 2s ease-out infinite;
    }
    .card { padding: 30px 32px; }
    .card::after {
      content: '';
      position: absolute;
      left: 0; top: 24px; bottom: 24px;
      width: 3px;
      border-radius: 0 3px 3px 0;
      background: var(--c);
    }
    .head {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }
    .who { display: flex; gap: 16px; align-items: center; }
    .badge {
      flex: none;
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: 14px;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.3rem;
      color: #fff;
      background: linear-gradient(135deg, var(--c), color-mix(in srgb, var(--c) 50%, #111));
      box-shadow: 0 10px 24px -10px var(--c);
    }
    h3 { font-size: 1.25rem; }
    .company { margin-top: 4px; display: flex; flex-wrap: wrap; gap: 8px; align-items: baseline; }
    .company strong { color: var(--c); filter: brightness(1.15); }
    .via { font-size: 0.85rem; color: var(--faint); }
    .when { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
    .period {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--muted);
    }
    .now {
      padding: 2px 8px;
      border-radius: 99px;
      font-size: 0.7rem;
      font-weight: 600;
      color: #fff;
      background: var(--emerald);
    }
    .loc { display: inline-flex; align-items: center; gap: 5px; font-size: 0.82rem; color: var(--faint); }
    .project {
      margin-top: 20px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 10px;
      font-size: 0.86rem;
      font-weight: 500;
      background: color-mix(in srgb, var(--c) 12%, transparent);
      color: var(--text);
    }
    .summary { margin-top: 16px; color: var(--text); font-size: 1.02rem; }
    .highlights {
      margin: 16px 0 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 10px;
    }
    .highlights li {
      position: relative;
      padding-left: 22px;
      color: var(--muted);
      font-size: 0.95rem;
      animation: fade-in 0.4s var(--ease) both;
    }
    .highlights li::before {
      content: '';
      position: absolute;
      left: 2px;
      top: 0.62em;
      width: 8px;
      height: 8px;
      border-radius: 2px;
      transform: rotate(45deg);
      background: var(--c);
    }
    .more {
      margin-top: 16px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--c);
      filter: brightness(1.2);
    }
    .more app-icon { transition: transform 0.3s var(--ease); }
    .more app-icon.flip { transform: rotate(180deg); }
    .tech { margin-top: 22px; display: flex; flex-wrap: wrap; gap: 8px; }

    @keyframes ripple {
      from { transform: scale(1); opacity: 1; }
      to { transform: scale(2.4); opacity: 0; }
    }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: none; }
    }
    @media (max-width: 640px) {
      .timeline { padding-left: 28px; }
      .timeline::before { left: 6px; }
      .node { left: -29px; width: 14px; height: 14px; }
      .card { padding: 24px 20px; }
      .when { align-items: flex-start; }
    }
  `,
})
export class Experience {
  protected readonly jobs = EXPERIENCE;
  protected readonly preview = PREVIEW;
  private readonly open = signal<ReadonlySet<number>>(new Set());

  protected isOpen(i: number): boolean {
    return this.open().has(i);
  }

  protected toggle(i: number): void {
    this.open.update((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }
}
