import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';

/** Animated number that counts up when scrolled into view. */
@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ prefix() }}{{ display() }}{{ suffix() }}`,
  host: { '[attr.aria-label]': 'prefix() + to() + suffix()' },
})
export class Counter {
  readonly to = input.required<number>();
  readonly prefix = input('');
  readonly suffix = input('');
  readonly duration = input(1800);

  protected readonly display = signal(0);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    let raf = 0;

    afterNextRender(() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || !('IntersectionObserver' in window)) {
        this.display.set(this.to());
        return;
      }
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          const start = performance.now();
          const target = this.to();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / this.duration());
            const eased = 1 - Math.pow(1 - t, 4);
            this.display.set(Math.round(target * eased));
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        },
        { threshold: 0.4 },
      );
      io.observe(el);
      destroyRef.onDestroy(() => {
        io.disconnect();
        cancelAnimationFrame(raf);
      });
    });
  }
}
