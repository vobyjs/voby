
/* MAIN */

const PageScrolling = (): JSX.Element => {

  return (
    <>
      <h1>Scrolling</h1>
      {new Array ( 100 ).fill ( 0 ).map ( ( _, idx ) => (
        <a id={idx} href={`#${idx}`} style={{ display: 'block', height: 16, width: `${100 * Math.random ()}%`, marginBottom: 4, background: 'lightgray' }}>{idx}</a>
      ))}
    </>
  );

};

/* EXPORT */

export default PageScrolling;
