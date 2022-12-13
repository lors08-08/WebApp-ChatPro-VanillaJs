function debounce(cb: () => void, ms: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: [cb: () => void, ms: number] | undefined[]) {
    return new Promise((res, rej) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      setTimeout(() => {
        timer = null;

        try {
          cb.call(this, args);
        } catch (error) {
          rej(error);
        }
      }, ms);
    });
  };
}

export default debounce;
