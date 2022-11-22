// import React, { Component } from 'react';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';

import {
  ImageGallerySet,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
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
  //  componentDidUpdate(prevProps, prevState) {
  //   if (this.state.isModalOpen) {
  //     window.addEventListener('keydown', onModalKeydown);
  //   } else window.removeEventListener('keydown', onModalKeydown);
  // }

  useEffect(() => {
    window.addEventListener('keydown', onModalKeydown);
  }, [isModalOpen]);

  // const { webformatURL, largeImageURL, tags, id } = image;
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
// export default class ImageGalleryItem extends Component {
//   state = {
//     isModalOpen: false,
//   };

// componentDidUpdate(prevProps, prevState) {
//   if (this.state.isModalOpen) {
//     window.addEventListener('keydown', this.onModalKeydown);
//   } else window.removeEventListener('keydown', this.onModalKeydown);
// }

// onModalKeydown = e => {
//   if (e.key === 'Escape') {
//     this.closeModal();
//   }
// };

// openModal = () => {
//   this.setState({ isModalOpen: true });
// };

// closeModal = () => {
//   this.setState(isModalOpen => ({
//     isModalOpen: !isModalOpen,
//   }));
// };

// render() {
// const { webformatURL, largeImageURL, tags, id } = this.props.image;
// return (
//   <ImageGallerySet className="gallery-item">
//     <ImageGalleryItemImage
//       src={webformatURL}
//       alt={id}
//       onClick={this.openModal}
//     />
//     {this.state.isModalOpen && (
//       <Modal
//         largeImageURL={largeImageURL}
//         about={tags}
//         onModalClose={this.closeModal}
//       />
//     )}
//   </ImageGallerySet>
// );
//   }
// }

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,

  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
