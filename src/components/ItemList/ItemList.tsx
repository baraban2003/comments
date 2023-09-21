import { useState } from 'react';
import { customAlphabet } from 'nanoid';
import s from './ItemList.module.css';
import useLocalState from '../../hooks';

export default function ItemList() {
  const [item, setItem] = useLocalState('items', []);
  const [name, setName] = useState('');
  const nanoid = customAlphabet('1234567890', 8);
  const id = nanoid();

  const handleChange = (event: { target: any }) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: { target: any; preventDefault: () => void }) => {
    event.preventDefault();
    const names = event.target[0].value;
    const comments: never[] = [];
    let mergedData;
    if (item) {
      mergedData = { ...item, ...[{ id, name, comments }] };
    } else {
      mergedData = [{ id, name, comments }];
    }

    setItem(mergedData);

    setName('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={s.searchForm}>
          <h2>Name</h2>
          <input
            className={s.name}
            type="text"
            name="name"
            title="ple Adrian, Jacob Mercer, Charles"
            required
            value={name}
            onChange={handleChange}
          />

          <button type="submit" className={s.ripple}>
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}
