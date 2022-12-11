import merge from "@utils/funcs/Merge";

type Indexed<T = unknown> = {
  [key in string]: T;
};

function set(
  object: Indexed | any,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  const combined = path.split(".").reduceRight((acc, cur, idx) => {
    if (idx === path.split(".").length - 1) {
      acc[cur] = value;

      return acc;
    }

    acc = { [cur]: acc };

    return acc;
  }, {} as Record<string, any>);

  return merge(object, combined);
}

// console.log(set({ foo: 5 }, "bar.baz", 10));
// { foo: 5, bar: { baz: 10 } }

export default set;
