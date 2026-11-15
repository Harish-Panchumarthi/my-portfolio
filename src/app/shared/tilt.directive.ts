import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * Adds a pointer-following spotlight and an optional subtle 3D tilt.
 * Listeners are attached natively so pointer moves don't trigger change detection.
 * Usage: <div appTilt> or <div [appTilt]="6"> (max tilt in degrees, 0 = spotlight only)
 */
@Directive({
  selector: '[appTilt]',
  host: { class: 'spotlight' },
})
export class TiltDirective {
  readonly max = input(5, { alias: 'appTilt', transform: (v: unknown) => (v === '' ? 5 : Number(v) || 0) });

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!finePointer) return;

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', `${x * 100}%`);
        el.style.setProperty('--my', `${y * 100}%`);
        const max = reduced ? 0 : this.max();
        if (max) {
          el.style.setProperty('--rx', `${(0.5 - y) * max}deg`);
          el.style.setProperty('--ry', `${(x - 0.5) * max}deg`);
        }
      };
      const leave = () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      };

      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      destroyRef.onDestroy(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      });
    });
  }
}
