type TResult = string | string[] | undefined;

interface IData<T> {
  data: T;
  path: string;
}

function getObjectData<T>({ data, path }: IData<T>): TResult {
  const keys = path.split(".");

  let currentData = data;

  for (let key of keys) {
    if (!currentData || !Object.keys(currentData).length || !currentData[key]) {
      return undefined;
    }

    if (Array.isArray(currentData[key])) {
      return currentData[key] as string[];
    }

    if (typeof currentData[key] === "string") {
      return currentData[key] as string;
    }

    // if (
    //   typeof currentData[key] === "object" &&
    //   Array.isArray(currentData[key])
    // ) {
    //   currentData = currentData[key] as IContextData;
    // }
  }

  return undefined;
}

export default getObjectData;
