import { useEffect, useState } from 'react';

export default function useLocalState(key: string, initial: []) {
  const [value, setValue] = useState(() => {
    if (typeof window !== undefined && window.localStorage) {
      const saved = window.localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return initial;
  });

  useEffect(() => {
    if (window.localStorage) {
      setValue(value);

      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue];
}
