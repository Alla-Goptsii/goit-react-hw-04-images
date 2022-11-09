import { Overlay, ModalBox } from './Modal.styled';

export const Modal = ({ largeImageURL, about, onModalClose }) => {
  return (
    <Overlay
      onClick={e => {
        if (e.target === e.currentTarget) onModalClose();
      }}
    >
      <ModalBox>
        <img src={largeImageURL} alt={about} />
      </ModalBox>
    </Overlay>
  );
};
