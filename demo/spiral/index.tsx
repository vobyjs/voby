
/* IMPORT */

import type { JSX, Observable, ObservableReadonly } from 'voby'
import { $, render, untrack, For, If, useAnimationLoop, useMemo } from 'voby'

/* HELPERS */

const COUNT = 400
const LOOPS = 6

/* MAIN */

const Cursor = ({ big, label, x, y, color }: { big: Observable<boolean>, label: boolean, x: ObservableReadonly<number>, y: ObservableReadonly<number>, color?: ObservableReadonly<string> }): JSX.Element => {

  return (
    <div class={{ cursor: true, label, big }} style={{ left: x, top: y, borderColor: color }}>
      <If when={label}>
        <span class="label">{x},{y}</span>
      </If>
    </div>
  )

}

const Spiral = (): JSX.Element => {

  const x = $(0)
  const y = $(0)
  const big = $(false)
  const counter = $(0)

  window.addEventListener('mousemove', ({ pageX, pageY }) => {
    x(pageX)
    y(pageY)
  })

  window.addEventListener('mousedown', () => {
    big(true)
  })

  window.addEventListener('mouseup', () => {
    big(false)
  })

  useAnimationLoop(() => counter(counter() + 1))

  const max = useMemo(() => COUNT + Math.round(Math.sin(counter() / 90 * 2 * Math.PI) * COUNT * 0.5))

  const makeCursor = (i: number) => ({
    x: (): number => {
      const f = i / max() * LOOPS
      const θ = f * 2 * Math.PI
      const m = 20 + i
      return (untrack(x) + Math.sin(θ) * m) | 0
    },
    y: (): number => {
      const f = i / max() * LOOPS
      const θ = f * 2 * Math.PI
      const m = 20 + i
      return (untrack(y) + Math.cos(θ) * m) | 0
    },
    color: (): string => {
      const f = i / max() * LOOPS
      const hue = (f * 255 + untrack(counter) * 10) % 255
      return `hsl(${hue},100%,50%)`
    }
  })

  const cache = []
  const cursors = useMemo(() => Array(max()).fill(0).map((_, i) => cache[i] || (cache[i] = makeCursor(i))))

  return (
    <div id="main">
      <Cursor label={true} big={big} x={x} y={y} />
      <For values={cursors}>
        {({ x, y, color }) => {
          return <Cursor big={big} label={false} x={x} y={y} color={color} />
        }}
      </For>
    </div>
  )

}

render(<Spiral />, document.getElementById('app'))
