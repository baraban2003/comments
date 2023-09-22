import { Key, useEffect, useState } from 'react';
import { customAlphabet } from 'nanoid';
import s from './ItemList.module.css';
import useLocalState from '../../hooks';
import Item from '../Item/Item';

export default function ItemList() {
  const [items, setItems] = useLocalState('items', []);
  const [activeItem, setActiveItem] = useLocalState('activeItem', []);

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

  const activate = (event: any) => {
    const active = items.filter((e: { id: any }) => e.id == event.target.id);
    setActiveItem(active);
  };

  return (
    <div className={s.itemForm}>
      <h2 className={s.itemName}>Items</h2>
      <form onSubmit={handleSubmit}>
        <div className={s.itemFormElem}>
          <input
            placeholder="Type name here..."
            className={s.name}
            type="text"
            name="name"
            title="Place for adding items"
            required
            value={name}
            onChange={handleChange}
            autoComplete="off"
          />

          <button type="submit" className={s.button}>
            Add Item
          </button>
        </div>
      </form>
      <ul className={s.listGroup}>
        {items.map(
          (e: {
            comments: any;
            d: Key | null | undefined;
            id: string;
            name: string;
          }) => {
            const isActive = activeItem?.[0]?.id === e.id;
            return (
              <div className={isActive ? s.picker : ''}>
                <Item
                  key={e.id}
                  id={e.id}
                  itemName={e.name}
                  deleteEl={deleteEl}
                  comentsCalc={e.comments.length}
                  active={activate}
                />
              </div>
            );
          }
        )}
      </ul>
    </div>
  );
}
