
/* IMPORT */

import {$, render, useInterval, Observable, ObservableReadonly, useAnimationLoop, useComputed} from 'voby';

/* MAIN */

const TARGET = 25;

const useSeconds = (): Observable<number> => {

  const seconds = $(0);

  useInterval ( () => seconds ( ( seconds () % 9 ) + 1 ), 1000 );

  return seconds;

};

const useElapsed = (): Observable<number> => {

  const elapsed = $(0);
  const start = Date.now ();

  useAnimationLoop ( () => elapsed ( Date.now () - start ) );

  return elapsed;

};

const useScale = ( elapsed: Observable<number> ): ObservableReadonly<number> => {

  return useComputed ( () => {

    const e = elapsed () / 1000 % 10;

    return 1 + ( e > 5 ? 10 - e : e ) / 10;

  });

};

const Dot = ({ x, y, s, text }: { x: number, y: number, s: number, text: Observable<number> }): JSX.Element => {

  const hovering = $(false);

  const onMouseEnter = () => hovering ( true );
  const onMouseLeave = () => hovering ( false );

  s = s * 1.3;

  const width = s;
  const height = s;
  const left = x;
  const top = y;
  const borderRadius = s / 2;
  const lineHeight = `${s}px`;
  const background = hovering.on ( value => value ? '#ffff00' : '#61dafb' );
  const style = { width, height, left, top, borderRadius, lineHeight, background };

  const content = hovering.on ( value => value ? text.on ( text => `**${text}**` ) : text );

  return (
    <div class="dot" style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {content}
    </div>
  );

};

const Triangle = ({ x, y, s, seconds }: { x: number, y: number; s: number, seconds: Observable<number> }) => {

  if ( s <= TARGET ) {

    return <Dot x={x - TARGET / 2} y={y - TARGET / 2} s={TARGET} text={seconds} />;

  } else {

    s = s / 2;

    return (
      <>
        <Triangle x={x} y={y - s / 2} s={s} seconds={seconds} />
        <Triangle x={x - s} y={y + s / 2} s={s} seconds={seconds} />
        <Triangle x={x + s} y={y + s / 2} s={s} seconds={seconds} />
      </>
    );

  }

};

const SierpinskiTriangle = () => {

  const seconds = useSeconds ();
  const elapsed = useElapsed ();
  const scale = useScale ( elapsed );

  const transform = scale.on ( value => `scaleX(${value / 3}) scaleY(.5) translateZ(0.1px)` );

  return (
    <div class="container" style={{ transform }}>
      <Triangle x={0} y={0} s={1000} seconds={seconds} />
    </div>
  );
};

render ( <SierpinskiTriangle />, document.getElementById ( 'app' ) );
