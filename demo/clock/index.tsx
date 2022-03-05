
/* IMPORT */

import {$, render, svg, useInterval, Observable} from 'voby';

/* HELPERS */

const mapRange = <T extends unknown> ( start: number, end: number, increment: number, callback: (( nr: number ) => T) ): T[] => {
  const results: T[] = [];
  for ( let i = start; i < end; i += increment ) {
    results.push ( callback ( i ) );
  }
  return results;
};

/* MAIN */

const useDate = () => {

  const date = $(new Date ());

  const tick = () => date ( new Date () );

  useInterval ( tick, 1000 );

  return date;

};

const ClockFace = ({ date }: { date: Observable<Date> }): JSX.Element => {

  return svg`
    <svg viewBox="0 0 100 100">
      <g transform=translate(50,50)>
        <circle class=clock-face r=48 />
        ${mapRange ( 0, 60, 1, i => `<line class=minor y1=42 y2=45 transform=rotate(${(360 * i) / 60}) />` ).join ( '' )}
        ${mapRange ( 0, 12, 1, i => `<line class=major y1=32 y2=45 transform=rotate(${(360 * i) / 12}) />` ).join ( '' )}
        <line class=hour y1=2 y2=-20 transform=rotate(${() => 30 * date ().getHours () + date ().getMinutes () / 2}) />
        <line class=minute y1=4 y2=-30 transform=rotate(${() => 6 * date ().getMinutes () + date ().getSeconds () / 10}) />
        <g transform=rotate(${() => 6 * date ().getSeconds ()})>
          <line class=second y1=10 y2=-38 />
          <line class=second-counterweight y1=10 y2=2 />
        </g>
      </g>
    </svg>
  `;

};

const Clock = (): JSX.Element => {

  const date = useDate ();

  return (
    <div class="clock">
      <ClockFace date={date} />
    </div>
  );

};

render ( <Clock />, document.getElementById ( 'app' ) );
