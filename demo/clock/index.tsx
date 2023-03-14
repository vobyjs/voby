
/* IMPORT */
import { $, render, useAnimationLoop } from 'voby'
import type { JSX, Observable } from 'voby'

/* HELPERS */

const mapRange = <T extends unknown>(start: number, end: number, increment: number, callback: ((nr: number) => T)): T[] => {
  const results: T[] = []
  for (let i = start; i < end; i += increment) {
    results.push(callback(i))
  }
  return results
}

const getMillisecondsSinceMidnight = (): number => {

  const now = Date.now()
  const midnight = new Date().setHours(0, 0, 0, 0)

  return now - midnight

}

/* MAIN */

const useTime = () => {

  const time = $(getMillisecondsSinceMidnight() / 1000)

  const tick = () => time(getMillisecondsSinceMidnight() / 1000)

  useAnimationLoop(tick)

  return time

}

const ClockFace = ({ time }: { time: Observable<number> }): JSX.Element => {

  const abstract = (rotate: number) => `rotate(${(rotate * 360).toFixed(1)})`
  const millisecond = () => abstract(time() % 1)
  const second = () => abstract((time() % 60) / 60)
  const minute = () => abstract((time() / 60 % 60) / 60)
  const hour = () => abstract((time() / 60 / 60 % 12) / 12)

  return (
    <svg viewBox="0 0 100 100">
      <g transform="translate(50, 50)">
        <circle class="clock-face" r={48} />
        {mapRange(0, 60, 1, i => (
          <line class="minor" y1={44} y2={45} transform={`rotate(${(360 * i) / 60})`} />
        ))}
        {mapRange(0, 12, 1, i => (
          <line class="major" y1={40} y2={45} transform={`rotate(${(360 * i) / 12})`} />
        ))}
        <line class="millisecond" y2={-44} transform={millisecond} />
        <line class="hour" y2={-22} transform={hour} />
        <line class="minute" y2={-32} transform={minute} />
        <line class="second" y2={-38} transform={second} />
      </g>
    </svg>
  )

}

const Clock = (): JSX.Element => {

  const time = useTime()

  return (
    <div class="clock">
      <ClockFace time={time} />
    </div>
  )

}

render(<Clock />, document.getElementById('app'))
