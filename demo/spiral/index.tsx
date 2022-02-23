
/* IMPORT */

import {$, render, For, If, useAnimationLoop, useComputed, Observable, ObservableReadonly, ObservableMaybe} from 'voby';

/* MAIN */

const COUNT = 500;
const LOOPS = 6;

const Cursor = ({ big, label, x, y, color }: { big: ObservableMaybe<boolean>, label: ObservableMaybe<boolean>, x: Observable<number>, y: Observable<number>, color: string }): JSX.Element => {

  return (
    <div class={{ cursor: true, label, big }} style={{ left: x, top: y, borderColor: color }}>
      <If when={label}>
        <span class="label">${x},${y}</span>
      </If>
    </div>
  );

};

const Spiral = (): JSX.Element => {

  const x = $(0);
  const y = $(0);
  const big = $(false);
  const counter = $(0);

  window.addEventListener ( 'mousemove', ({ pageX, pageY }) => {
    x ( pageX );
    y ( pageY );
  });

  window.addEventListener ( 'mousedown', () => {
    big ( true );
  });

  window.addEventListener ( 'mouseup', () => {
    big ( false );
  });

  useAnimationLoop ( () => counter ( counter () + 1 ) );

  const max = useComputed ( () => COUNT + Math.round ( Math.sin ( counter () / 90 * 2 * Math.PI ) * COUNT * 0.5 ) );

  const makeCursor = ( i: number ) => ({
    x: (): ObservableReadonly<number> => {
      return useComputed ( () => {
        const f = i / max () * LOOPS;
        const θ = f * 2 * Math.PI;
        const m = 20 + i;
        return (x.sample () + Math.sin ( θ ) * m) | 0;
      });
    },
    y: (): ObservableReadonly<number> => {
      return useComputed ( () => {
        const f = i / max () * LOOPS;
        const θ = f * 2 * Math.PI;
        const m = 20 + i;
        return (y.sample () + Math.cos ( θ ) * m) | 0;
      });
    },
    color: (): ObservableReadonly<string> => {
      return useComputed ( () => {
        const f = i / max () * LOOPS;
        const hue = (f * 255 + counter.sample () * 10) % 255;
        return `hsl(${hue},100%,50%)`;
      });
    }
  });

  const cache = [];
  const cursors = useComputed ( () => Array ( max () ).fill ( 0 ).map ( ( _, i ) => cache[i] || ( cache[i] = makeCursor ( i ) ) ) );

  return (
    <div id="main">
      <Cursor label big={big} x={x} y={y} />
      <For values={cursors}>
        {({ x, y, color }) => {
          return <Cursor big={big} x={x ()} y={y ()} color={color ()} />
        }}
      </For>
    </div>
  );

};

render ( <Spiral />, document.getElementById ( 'app' ) );
