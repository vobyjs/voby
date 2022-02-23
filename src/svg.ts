
/* MAIN */

//TODO: This function is unsafe, SVG support should be implemented natively

function svg (): Node | null {

  const container = document.createElement ( 'div' );
  const html = String.raw.apply ( undefined, arguments );

  container.innerHTML = html.trim ();

  return container.firstChild;

};

/* EXPORT */

export default svg;
