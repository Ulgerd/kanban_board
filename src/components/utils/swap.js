export const swap = (i1, i2, xs) => {
  if (i1 === i2) return xs
  return xs.reduce((z, x, i) => {
    return i === i1 ? z :
           i === i2 ? (i1 > i2 ? [...z, xs[i1], x] : [...z, x, xs[i1]]) :
                 [...z, x]
  }, [])
}
