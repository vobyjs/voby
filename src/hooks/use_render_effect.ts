
/* IMPORT */

import useEffect from '~/hooks/use_effect';
import type {Disposer, EffectFunction, EffectOptions} from '~/types';

/* HELPERS */

const options: EffectOptions = {
  sync: 'init'
};

/* MAIN */

// This function exists for convenience, and to avoid creating unnecessary options objects

const useRenderEffect = ( fn: EffectFunction ): Disposer => {

  return useEffect ( fn, options );

};

/* EXPORT */

export default useRenderEffect;
