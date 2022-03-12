
/* MAIN */

class Fragment {

  /* VARIABLES */

  private current: (Fragment | Node)[] = []; //TODO: Maybe store a single node when possible

  /* API */

  flat (): Node[] { //TODO: Massively optimize this, which is a huge pain point

    return this.current.map ( c => c instanceof Fragment ? c.flat () : c ).flat ();

  }

  push ( value: Fragment | Node ): void {

    this.current.push ( value );

  }

  replaceWith ( fragment: Fragment ): void {

    this.current = fragment.current;

  }

  set ( values: (Fragment | Node)[] ): void {

    this.current = values;

  }

}

/* EXPORT */

export default Fragment;
