
/* MAIN */

class Fragment {

  /* VARIABLES */

  values: (Fragment | Node)[] = [];
  fragmented: boolean = false;

  /* API */

  getChildrenFragmented ( children: Node[] = [] ): Node[] {

    const {values} = this;

    for ( let i = 0, l = values.length; i < l; i++ ) {

      const value = values[i];

      if ( value instanceof Fragment ) {

        value.getChildrenFragmented ( children );

      } else {

        children.push ( value );

      }

    }

    return children;

  }

  getChildren (): Node[] {

    if ( this.fragmented ) {

      return this.getChildrenFragmented ();

    } else {

      return this.values as Node[]; //TSC

    }

  }

  pushFragment ( value: Fragment ): void {

    this.values.push ( value );
    this.fragmented = true;

  }

  pushNode ( value: Node ): void {

    this.values.push ( value );

  }

  replaceWithNode ( node: Node ): void {

    this.values = [node];
    this.fragmented = false;

  }

  replaceWithFragment ( fragment: Fragment ): void {

    this.values = fragment.values;
    this.fragmented = fragment.fragmented;

  }

  setFragment ( fragment: Fragment ): void {

    this.values = [fragment];
    this.fragmented = true;

  }

  setNode ( node: Node ): void {

    this.values = [node];
    this.fragmented = false;

  }

}

/* EXPORT */

export default Fragment;
