import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { About } from './sections/about';
import { Contact } from './sections/contact';
import { Experience } from './sections/experience';
import { Hero } from './sections/hero';
import { Impact } from './sections/impact';
import { Nav } from './sections/nav';
import { Recognition } from './sections/recognition';
import { Skills } from './sections/skills';
import { Icon } from './shared/icon';

@Component({
  selector: 'app-root',
  imports: [Nav, Hero, About, Impact, Skills, Experience, Recognition, Contact, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly showTop = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Scroll progress + cursor glow are driven via CSS variables, outside change detection.
    afterNextRender(() => {
      const root = document.documentElement;
      let frame = 0;

      const onScroll = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const max = root.scrollHeight - innerHeight;
          root.style.setProperty('--scroll', String(max > 0 ? scrollY / max : 0));
          const top = scrollY > innerHeight;
          if (top !== this.showTop()) this.showTop.set(top);
        });
      };
      const onMove = (e: PointerEvent) => {
        root.style.setProperty('--cx', `${e.clientX}px`);
        root.style.setProperty('--cy', `${e.clientY}px`);
      };

      onScroll();
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('pointermove', onMove, { passive: true });
      destroyRef.onDestroy(() => {
        removeEventListener('scroll', onScroll);
        removeEventListener('pointermove', onMove);
        cancelAnimationFrame(frame);
      });
    });
  }

  protected toTop(): void {
    scrollTo({ top: 0, behavior: 'smooth' });
  }
}
