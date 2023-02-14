
/* IMPORT */

import useScheduler from '../hooks/use_scheduler'
import type { Disposer, ObservableMaybe } from '../types'

/* MAIN */

const useAnimationFrame = (callback: ObservableMaybe<FrameRequestCallback>): Disposer => {

    return useScheduler({
        callback,
        cancel: cancelAnimationFrame,
        schedule: requestAnimationFrame
    })

}

/* EXPORT */

export default useAnimationFrame
