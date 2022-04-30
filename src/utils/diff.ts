/**
 * ISC License
 *
 * Copyright (c) 2020, Andrea Giammarchi, @WebReflection
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
 * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

/* MAIN */

// This is just a slightly customized version of udomdiff: with types, no accessor function and recycling support

const diff = ( parent: Node, before: Node[], after: Node[], nextSibling: Node | null ): void => {
  const bLength = after.length;
  let aEnd = before.length;
  let bEnd = bLength;
  let aStart = 0;
  let bStart = 0;
  let map: Map<any, any> | null = null;
  let recycle: Function | undefined;
  let removable: Node | undefined;
  while (aStart < aEnd || bStart < bEnd) {
    // append head, tail, or nodes in between: fast path
    if (aEnd === aStart) {
      // we could be in a situation where the rest of nodes that
      // need to be added are not at the end, and in such case
      // the node to `insertBefore`, if the index is more than 0
      // must be retrieved, otherwise it's gonna be the first item.
      const node = bEnd < bLength ?
        (bStart ?
          (after[bStart - 1].nextSibling) :
          after[bEnd - bStart]) :
        nextSibling;
      while (bStart < bEnd)
        parent.insertBefore(after[bStart++], node);
    }
    // remove head or tail: fast path
    else if (bEnd === bStart) {
      while (aStart < aEnd) {
        // remove the node only if it's unknown or not live
        if (!map || !map.has(before[aStart])) {
          removable = before[aStart];
          parent.removeChild(removable);
          recycle = removable.recycle;
          if (recycle) recycle(removable);
        }
        aStart++;
      }
    }
    // same node: fast path
    else if (before[aStart] === after[bStart]) {
      aStart++;
      bStart++;
    }
    // same tail: fast path
    else if (before[aEnd - 1] === after[bEnd - 1]) {
      aEnd--;
      bEnd--;
    }
    // The once here single last swap "fast path" has been removed in v1.1.0
    // https://github.com/WebReflection/udomdiff/blob/single-final-swap/esm/index.js#L69-L85
    // reverse swap: also fast path
    else if (
      before[aStart] === after[bEnd - 1] &&
      after[bStart] === before[aEnd - 1]
    ) {
      // this is a "shrink" operation that could happen in these cases:
      // [1, 2, 3, 4, 5]
      // [1, 4, 3, 2, 5]
      // or asymmetric too
      // [1, 2, 3, 4, 5]
      // [1, 2, 3, 5, 6, 4]
      const node = before[--aEnd].nextSibling;
      parent.insertBefore(
        after[bStart++],
        before[aStart++].nextSibling
      );
      parent.insertBefore(after[--bEnd], node);
      // mark the future index as identical (yeah, it's dirty, but cheap 👍)
      // The main reason to do this, is that when a[aEnd] will be reached,
      // the loop will likely be on the fast path, as identical to b[bEnd].
      // In the best case scenario, the next loop will skip the tail,
      // but in the worst one, this node will be considered as already
      // processed, bailing out pretty quickly from the map index check
      before[aEnd] = after[bEnd];
    }
    // map based fallback, "slow" path
    else {
      // the map requires an O(bEnd - bStart) operation once
      // to store all future nodes indexes for later purposes.
      // In the worst case scenario, this is a full O(N) cost,
      // and such scenario happens at least when all nodes are different,
      // but also if both first and last items of the lists are different
      if (!map) {
        map = new Map;
        let i = bStart;
        while (i < bEnd)
          map.set(after[i], i++);
      }
      // if it's a future node, hence it needs some handling
      if (map.has(before[aStart])) {
        // grab the index of such node, 'cause it might have been processed
        const index = map.get(before[aStart]);
        // if it's not already processed, look on demand for the next LCS
        if (bStart < index && index < bEnd) {
          let i = aStart;
          // counts the amount of nodes that are the same in the future
          let sequence = 1;
          while (++i < aEnd && i < bEnd && map.get(before[i]) === (index + sequence))
            sequence++;
          // effort decision here: if the sequence is longer than replaces
          // needed to reach such sequence, which would brings again this loop
          // to the fast path, prepend the difference before a sequence,
          // and move only the future list index forward, so that aStart
          // and bStart will be aligned again, hence on the fast path.
          // An example considering aStart and bStart are both 0:
          // a: [1, 2, 3, 4]
          // b: [7, 1, 2, 3, 6]
          // this would place 7 before 1 and, from that time on, 1, 2, and 3
          // will be processed at zero cost
          if (sequence > (index - bStart)) {
            const node = before[aStart];
            while (bStart < index)
              parent.insertBefore(after[bStart++], node);
          }
          // if the effort wasn't good enough, fallback to a replace,
          // moving both source and target indexes forward, hoping that some
          // similar node will be found later on, to go back to the fast path
          else {
            parent.replaceChild(
              after[bStart++],
              before[aStart++]
            );
          }
        }
        // otherwise move the source forward, 'cause there's nothing to do
        else
          aStart++;
      }
      // this node has no meaning in the future list, so it's more than safe
      // to remove it, and check the next live node out instead, meaning
      // that only the live list index should be forwarded
      else {
        removable = before[aStart++];
        parent.removeChild(removable);
        recycle = removable.recycle;
        if (recycle) recycle(removable);
      }
    }
  }
};

/* EXPORT */

export default diff;
