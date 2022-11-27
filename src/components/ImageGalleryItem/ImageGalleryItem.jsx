import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';

import {
  ImageGallerySet,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  image,
  tags,
  largeImageURL,
  id,
  webformatURL,
}) {
  const [isModalOpen, setIsModalOpen] = useState('false');

  const onModalKeydown = e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('keydown', onModalKeydown);
    } else window.removeEventListener('keydown', onModalKeydown);
  });

  return (
    <ImageGallerySet className="gallery-item">
      <ImageGalleryItemImage src={webformatURL} alt={id} onClick={openModal} />
      {isModalOpen === true && (
        <Modal
          largeImageURL={largeImageURL}
          about={tags}
          onModalClose={closeModal}
        />
      )}
    </ImageGallerySet>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,

  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
