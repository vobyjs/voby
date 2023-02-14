
/* IMPORT */

import useScheduler from '../hooks/use_scheduler'
import type { Disposer, ObservableMaybe } from '../types'

/* MAIN */

const useAnimationLoop = (callback: ObservableMaybe<FrameRequestCallback>): Disposer => {

    return useScheduler({
        callback,
        loop: true,
        cancel: cancelAnimationFrame,
        schedule: requestAnimationFrame
    })

}

/* EXPORT */

export default useAnimationLoop
