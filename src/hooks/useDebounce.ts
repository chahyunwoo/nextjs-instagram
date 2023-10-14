import { useEffect, useState } from "react";

export default function UseDebounce(value: string, delay: number = 500) {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounce(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounce;
}