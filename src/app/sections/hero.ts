import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { MARQUEE, PROFILE } from '../data/portfolio.data';
import { Icon } from '../shared/icon';
import { TiltDirective } from '../shared/tilt.directive';

@Component({
  selector: 'app-hero',
  imports: [Icon, TiltDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly profile = PROFILE;
  protected readonly marquee = [...MARQUEE, ...MARQUEE];
  protected readonly typed = signal(PROFILE.roles[0]);

  constructor() {
    const destroyRef = inject(DestroyRef);
    let timer: ReturnType<typeof setTimeout> | undefined;

    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const roles = this.profile.roles;
      let roleIdx = 0;
      let chars = roles[0].length;
      let deleting = true;
      this.typed.set(roles[0]);

      const step = () => {
        const word = roles[roleIdx];
        chars += deleting ? -1 : 1;
        this.typed.set(word.slice(0, chars));

        let delay = deleting ? 38 : 75;
        if (!deleting && chars === word.length) {
          deleting = true;
          delay = 2000;
        } else if (deleting && chars === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          delay = 300;
        }
        timer = setTimeout(step, delay);
      };
      timer = setTimeout(step, 2400);
    });

    destroyRef.onDestroy(() => clearTimeout(timer));
  }
}
