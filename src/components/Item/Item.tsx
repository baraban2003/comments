import React from 'react';
import s from './Item.module.css';

type Props = {
  itemName: string;
  deleteEl: Function;
  id: string;
  comentsCalc: number;
};

export default function Item({ itemName, deleteEl, id, comentsCalc }: Props) {
  return (
    <li className={s.item}>
      {itemName}
      <span>{comentsCalc}</span>
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
