import React from 'react';
import s from './Comments.module.css';

type Props = {
  commentName: string;

  //id: string;
  color: string;
};

export default function Comments({ commentName, color }: Props) {
  return (
    <li className={s.comment}>
      <div
        className={s.commentName}
        style={{
          backgroundColor: color,
          width: '50px',
          height: '50px',
        }}
      ></div>
      {commentName}
    </li>
  );
}
