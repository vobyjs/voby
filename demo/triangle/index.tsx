
/* IMPORT */

import type { JSX, Observable, ObservableReadonly } from 'voby'
import { $, render, useInterval, useAnimationLoop, useMemo } from 'voby'

/* HELPERS */

const RADIUS = 25

/* MAIN */

const useSeconds = (): Observable<number> => {

  const seconds = $(0)

  useInterval(() => {

    // Artificially long blocking delay
    const future = performance.now() + 0.8
    while (performance.now() < future) { }

    seconds((seconds() % 9) + 1)

  }, 1000)

  return seconds

}

const useElapsed = (): Observable<number> => {

  const elapsed = $(0)
  const start = Date.now()

  useAnimationLoop(() => elapsed(Date.now() - start))

  return elapsed

}

const useScale = (elapsed: Observable<number>): ObservableReadonly<number> => {

  return useMemo(() => {

    const e = elapsed() / 1000 % 10

    return 1 + (e > 5 ? 10 - e : e) / 10

  })

}

const Dot = ({ x, y, s, text }: { x: number, y: number, s: number, text: Observable<number> }): JSX.Element => {

  const hovering = $(false)

  const onMouseEnter = () => hovering(true)
  const onMouseLeave = () => hovering(false)

  s = s * 1.3

  const width = s
  const height = s
  const left = x
  const top = y
  const borderRadius = s / 2
  const lineHeight = `${s}px`
  const background = () => hovering() ? '#ffff00' : '#61dafb'
  const style = { width, height, left, top, borderRadius, lineHeight, background }

  return (
    <div class="dot" style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {() => hovering() ? `**${text()}**` : text()}
    </div>
  )

}

const Triangle = ({ x, y, s, seconds }: { x: number, y: number; s: number, seconds: Observable<number> }): JSX.Element => {

  if (s <= RADIUS) {

    return <Dot x={x - RADIUS / 2} y={y - RADIUS / 2} s={RADIUS} text={seconds} />

  } else {

    s = s / 2

    return (
      <>
        <Triangle x={x} y={y - s / 2} s={s} seconds={seconds} />
        <Triangle x={x - s} y={y + s / 2} s={s} seconds={seconds} />
        <Triangle x={x + s} y={y + s / 2} s={s} seconds={seconds} />
      </>
    )

  }

}

const SierpinskiTriangle = (): JSX.Element => {

  const seconds = useSeconds()
  const elapsed = useElapsed()
  const scale = useScale(elapsed)

  const transform = () => `scaleX(${scale() / 3}) scaleY(.5) translateZ(0.1px)`

  return (
    <div class="container" style={{ transform }}>
      <Triangle x={0} y={0} s={1000} seconds={seconds} />
    </div>
  )

}

render(<SierpinskiTriangle />, document.getElementById('app'))
