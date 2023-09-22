import React from 'react';
import s from './Item.module.css';

type Props = {
  itemName: string;
  deleteEl: Function;
  id: string;
  comentsCalc: number;
  active: any;
};

export default function Item({
  itemName,
  deleteEl,
  id,
  comentsCalc,
  active,
}: Props) {
  return (
    <li className={s.item} id={id} onClick={e => active(e)}>
      {itemName}
      <span className={s.commentsNumber}>{comentsCalc}</span>
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
