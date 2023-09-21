import React from 'react';
import s from './Item.module.css';

type Props = {
  itemName: string;
  deleteEl: Function;
  id: string;
};

export default function Item({ itemName, deleteEl, id }: Props) {
  return (
    <li className={s.item}>
      {itemName}
      <button
        type="button"
        className={s.deleteBtn}
        onClick={() => deleteEl(id)}
      >
        Delete
      </button>
    </li>
  );
}
