import { useEffect, useState } from 'react';

export default function useLocalState(key: string, initial: any) {
  // Функция для получения значения из локального хранилища
  const getStoredValue = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return initial;
  };

  const [value, setValue] = useState(getStoredValue);

  useEffect(() => {
    if (window.localStorage) {
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
    }
  }, [key, value]);

  // Функция для обновления значения из локального хранилища
  const updateStoredValue = () => {
    const storedValue = getStoredValue();
    if (storedValue !== value) {
      setValue(storedValue);
    }
  };

  // Вызываем функцию обновления при монтировании компонента
  useEffect(() => {
    updateStoredValue();
  }, []);

  // Вызываем функцию обновления периодически, чтобы следить за изменениями в локальном хранилище
  useEffect(() => {
    const interval = setInterval(updateStoredValue, 1000);
    return () => clearInterval(interval);
  }, []);

  return [value, setValue];
}
