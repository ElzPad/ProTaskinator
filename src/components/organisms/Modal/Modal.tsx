import { useState } from 'react';
import './Modal.css';
import { ChildrenProps } from '../../../types/global';

export default function Modal({
  children,
  status,
  title,
}: ChildrenProps & { status: string; title: string }) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const toggleIsOpened = () => {
    setIsOpened((prevState) => {
      return !prevState;
    });
  };

  return (
    <>
      <button
        className="btn"
        onClick={toggleIsOpened}
        style={{
          backgroundColor: status == 'ToDo' ? 'red' : 'green',
          textDecorationLine: status == 'ToDo' ? 'none' : 'line-through',
        }}
      >
        {title}
      </button>
      {isOpened && (
        <div className="modalOverlay" onClick={toggleIsOpened}>
          <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
            <div className="modalTop">
              <p>Title</p>
              <button className="btn modalBtn" onClick={toggleIsOpened}>
                X
              </button>
            </div>
            <div className="modalContent">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
