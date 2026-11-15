import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { SKILL_GROUPS } from '../data/portfolio.data';
import { RevealDirective } from '../shared/reveal.directive';

interface SkillItem {
  name: string;
  color: string;
  group: string;
}

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="section">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow" appReveal>Toolbox</span>
          <h2 class="section-title" appReveal="80">
            Skills &amp; <span class="gradient-text-2">technologies</span>
          </h2>
          <p class="section-sub" appReveal="140">
            A full-spectrum stack — from pixel-perfect UI to the pipelines and platforms that ship it.
          </p>
        </div>

        <div class="tabs" role="tablist" aria-label="Skill categories" appReveal="180">
          <button
            role="tab"
            [attr.aria-selected]="active() === 'all'"
            [class.on]="active() === 'all'"
            (click)="active.set('all')"
          >
            All <span class="count">{{ allSkills.length }}</span>
          </button>
          @for (g of groups; track g.id) {
            <button
              role="tab"
              [attr.aria-selected]="active() === g.id"
              [class.on]="active() === g.id"
              [style.--c]="g.color"
              (click)="active.set(g.id)"
            >
              <span class="dot"></span>{{ g.label }}
              <span class="count">{{ g.skills.length }}</span>
            </button>
          }
        </div>

        <div class="cloud glass" appReveal="220">
          @for (s of visible(); track s.group + s.name; let i = $index) {
            <span class="skill" [style.--c]="s.color" [style.--i]="i">{{ s.name }}</span>
          }
        </div>

        <div class="legend">
          @for (g of groups; track g.id; let i = $index) {
            <button class="legend-card glass" [appReveal]="i * 60" [style.--c]="g.color" (click)="active.set(g.id)">
              <span class="bar"></span>
              <strong>{{ g.skills.length }}</strong>
              <span>{{ g.label }}</span>
            </button>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .tabs {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-bottom: 28px;
    }
    .tabs button {
      --c: var(--pink);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: 999px;
      font-size: 0.92rem;
      font-weight: 500;
      color: var(--muted);
      background: var(--surface);
      border: 1px solid var(--border);
      transition: all 0.3s var(--ease);
    }
    .tabs button:hover { color: var(--text); border-color: var(--border-strong); }
    .tabs button.on {
      color: var(--text);
      border-color: color-mix(in srgb, var(--c) 60%, transparent);
      background: color-mix(in srgb, var(--c) 16%, transparent);
      box-shadow: 0 8px 26px -12px var(--c);
    }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--c); }
    .count {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      padding: 1px 7px;
      border-radius: 99px;
      background: var(--surface-strong);
    }
    .cloud {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      padding: 40px 32px;
      min-height: 220px;
      align-content: center;
    }
    .skill {
      padding: 10px 18px;
      border-radius: 14px;
      font-weight: 500;
      font-size: 0.95rem;
      background: color-mix(in srgb, var(--c) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--c) 30%, transparent);
      color: var(--text);
      animation: pop 0.5s var(--ease) both;
      animation-delay: calc(var(--i) * 18ms);
      transition: transform 0.25s var(--ease), background-color 0.25s, box-shadow 0.25s;
      cursor: default;
    }
    .skill:hover {
      transform: translateY(-4px) scale(1.05);
      background: color-mix(in srgb, var(--c) 28%, transparent);
      box-shadow: 0 10px 26px -10px var(--c);
    }
    .legend {
      margin-top: 24px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }
    .legend-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      padding: 20px;
      text-align: left;
      overflow: hidden;
      transition: transform 0.3s var(--ease), border-color 0.3s;
    }
    .legend-card:hover { transform: translateY(-4px); border-color: var(--c); }
    .legend-card .bar {
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 3px;
      background: var(--c);
    }
    .legend-card strong {
      font-family: var(--font-display);
      font-size: 1.8rem;
      line-height: 1;
      color: var(--c);
    }
    .legend-card span { color: var(--muted); font-size: 0.86rem; }

    @keyframes pop {
      from { opacity: 0; transform: translateY(10px) scale(0.9); }
      to { opacity: 1; transform: none; }
    }
    @media (max-width: 980px) {
      .legend { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 640px) {
      .legend { grid-template-columns: repeat(2, 1fr); }
      .cloud { padding: 28px 16px; gap: 8px; }
      .skill { font-size: 0.86rem; padding: 8px 13px; }
    }
  `,
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
  protected readonly active = signal<string>('all');

  protected readonly allSkills: SkillItem[] = SKILL_GROUPS.flatMap((g) =>
    g.skills.map((name) => ({ name, color: g.color, group: g.id })),
  );

  protected readonly visible = computed(() => {
    const a = this.active();
    return a === 'all' ? this.allSkills : this.allSkills.filter((s) => s.group === a);
  });
}
