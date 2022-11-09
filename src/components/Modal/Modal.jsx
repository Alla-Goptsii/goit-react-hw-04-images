import { Overlay, ModalBox } from './Modal.styled';
import PropTypes from 'prop-types';

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

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
