
/* MAIN */

const createComment = (): Comment => {

  return new Comment ();

};

const createText = ( value: any ): Text => {

  return new Text ( value );

};

/* EXPORT */

export {createComment, createText};
