import { useState } from 'react';
import './Modal.css';
import { ChildrenProps } from '../../../types/global';

export default function Modal({ children }: ChildrenProps) {
  const [isOpened, setIsOpened] = useState<boolean>(true);

  const toggleIsOpened = () => {
    setIsOpened((prevState) => {
      return !prevState;
    });
  };

  return (
    <>
      {!isOpened && (
        <button className="btn" onClick={toggleIsOpened}>
          Open
        </button>
      )}
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
