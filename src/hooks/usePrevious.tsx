import { useRef, useEffect } from "react";

const usePrevious = <T extends {} | undefined>(
  value: T,
): [T | undefined, () => void] => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  const resetPrevious = () => (ref.current = undefined);

  return [ref.current, resetPrevious];
};

export { usePrevious };
