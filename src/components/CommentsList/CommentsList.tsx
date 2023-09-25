import React, { useState } from 'react';
import s from './CommentsList.module.css';
import useLocalState from '../../hooks';
import Comments from '../Comments/Comments';
import { customAlphabet } from 'nanoid';
import { HexColorPicker } from 'react-colorful';

type CommentTuple = [number, string, string, string];

export default function CommentsList() {
  const [items, setItems] = useLocalState('items', []);

  const [activeItem, setActiveItem] = useLocalState('activeItem', []);
  const [name, setName] = useState('');

  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [color, setColor] = useState('#000000');

  const nanoid = customAlphabet('1234567890', 8);
  const idNano = nanoid();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedItems = items.map(
      (i: { comments: CommentTuple[]; id: number }) => {
        if (i.id === activeItem[0].id) {
          i.comments.push([activeItem[0].id, name, idNano, color]);
        }
        return i;
      }
    );
    setItems(updatedItems);
    setName('');
    setColor('#000000');

    const active = items.filter(
      (e: { id: string }) => e.id === activeItem[0].id
    );
    setActiveItem(active);
  };

  const handleColorChange = () => {
    setColorPickerVisible(!colorPickerVisible);
  };

  return (
    <div className={s.commentsBlok}>
      {activeItem && activeItem[0] && activeItem[0].comments ? (
        <h2 className={s.commentsName}>Comments{` #${activeItem[0].id}`}</h2>
      ) : null}
      <ul className={s.listCommentsName}>
        {activeItem.length > 0 ? (
          activeItem[0]?.comments ? (
            activeItem[0].comments.map((e: CommentTuple) => (
              <Comments commentName={e[1]} color={e[3]} key={e[2]} />
            ))
          ) : (
            <p>No comments available</p>
          )
        ) : (
          <p>No comments available</p>
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className={s.commentsBlokElem}>
          <div
            className={s.colorInputBlock}
            style={{
              backgroundColor: color,
            }}
            onClick={handleColorChange}
          ></div>
          {colorPickerVisible && (
            <HexColorPicker
              className={s.colorPicker}
              color={color}
              onChange={setColor}
              style={{
                position: 'absolute',
                zIndex: 1,
              }}
            />
          )}
          <textarea
            placeholder="Type comment here..."
            className={s.nameTextarea}
            name="name"
            title="Place for comments"
            required
            value={name}
            onChange={handleChange}
          />

          <button type="submit" className={s.commentsAddButton}>
            Add new
          </button>
        </div>
      </form>
    </div>
  );
}
