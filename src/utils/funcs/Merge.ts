type Indexed<T = unknown> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed | undefined {
  if (!rhs || !lhs) {
    return;
  }
  Object.entries(rhs).forEach(([k, v]) => {
    if (typeof lhs[k] === "object" && lhs[k] && v) {
      merge(lhs[k] as Record<string, string>, v as Record<string, string>);
    } else {
      lhs[k] = v;
    }
  });

  return lhs;
}

export default merge;

merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } });
