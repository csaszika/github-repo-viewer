import {animate, style, transition, trigger} from '@angular/animations';

export const fadeInAnimation =
  trigger('fadeInAnimation', [
    transition(':enter', [

      style({ opacity: 0 }),
      animate(400, style({ opacity: 1 }))
    ]),
  ]);
