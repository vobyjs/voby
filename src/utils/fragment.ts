
/* MAIN */

class Fragment {

  /* VARIABLES */

  private values: (Fragment | Node)[] = []; //TODO: Maybe store a single node when possible

  /* API */

  children ( children: Node[] = [] ): Node[] {

    const {values} = this;

    for ( let i = 0, l = values.length; i < l; i++ ) {

      const value = values[i];

      if ( value instanceof Fragment ) {

        value.children ( children );

      } else {

        children.push ( value );

      }

    }

    return children;

  }

  push ( value: Fragment | Node ): void {

    this.values.push ( value );

  }

  replaceWith ( fragment: Fragment ): void {

    this.values = fragment.values;

  }

  set ( values: (Fragment | Node)[] ): void {

    this.values = values;

  }

}

/* EXPORT */

export default Fragment;
