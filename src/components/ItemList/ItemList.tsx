import { Key, useState } from 'react';
import { customAlphabet } from 'nanoid';
import s from './ItemList.module.css';
import useLocalState from '../../hooks';
import Item from '../Item/Item';

export default function ItemList() {
  const [items, setItems] = useLocalState('items', []);

  const [name, setName] = useState('');
  const nanoid = customAlphabet('1234567890', 8);
  const id = nanoid();

  const handleChange = (event: { target: any }) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: { target: any; preventDefault: () => void }) => {
    event.preventDefault();

    setItems([...items, ...[{ id, name, comments: [] }]]);

    setName('');
  };

  const deleteEl = (elem: any) => {
    const deleted = items.filter((e: { id: any }) => e.id !== elem);
    setItems(deleted);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={s.searchForm}>
          <h2>Items</h2>
          <input
            placeholder="Type name here..."
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
      <ul>
        {items.map(
          (e: {
            comments: any;
            d: Key | null | undefined;
            id: string;
            name: string;
          }) => {
            return (
              <Item
                key={e.id}
                id={e.id}
                itemName={e.name}
                deleteEl={deleteEl}
                comentsCalc={e.comments.length}
              />
            );
          }
        )}
      </ul>
    </div>
  );
}
