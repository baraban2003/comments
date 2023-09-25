import { Key, useState, MouseEvent } from 'react';
import { customAlphabet } from 'nanoid';
import s from './ItemList.module.css';
import useLocalState from '../../hooks';
import Item from '../Item/Item';

interface ItemData {
  id: string;
  name: string;
  comments: any[];
}

export default function ItemList() {
  const [items, setItems] = useLocalState('items', []);
  const [activeItem, setActiveItem] = useLocalState('activeItem', []);

  const [name, setName] = useState('');

  const nanoid = customAlphabet('1234567890', 8);
  const id = nanoid();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newItem = { id, name, comments: [] };
    setItems([...items, ...[newItem]]);

    setActiveItem([newItem]);
    setName('');
  };

  const activate = (event: MouseEvent<HTMLDivElement>) => {
    const activeId = event.currentTarget.id;
    const active = items.filter((e: ItemData) => e.id === activeId);
    setActiveItem(active);
  };

  const deleteEl = (elemId: number) => {
    const deleted = items.filter((e: { id: number }) => e.id !== elemId);
    setItems(deleted);

    setTimeout(() => {
      setActiveItem([items[0]]);
    }, 1);
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
      {
        <ul className={s.listGroup}>
          {items.map(
            (
              e: {
                comments: any;
                d: Key | null | undefined;
                id: string;
                name: string;
              },
              index: string
            ) => {
              const isActive = activeItem?.[0]?.id === e.id;
              return (
                <div className={isActive ? s.picker : ''} key={e.id + index}>
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
      }
    </div>
  );
}
