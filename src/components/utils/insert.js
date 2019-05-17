export const insert = (i1, elem, xs) => {
  if (xs.length< i1+1) return [...xs, elem];
  return xs.reduce((z, x, i) => {
        return (i !== i1) ? [...z, x] : (i === i1) ?
          [...z, elem, x] : [...z, x, elem]
      }, [])
}
