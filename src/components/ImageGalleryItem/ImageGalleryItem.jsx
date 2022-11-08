// export const ImageGalleryItem = ({ id, smallImgURL }) => {

//   return (
//     <li className="gallery-item" >
//       <img src={smallImgURL} alt={id} />
//     </li>
//   );
// };

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    // id,
    // smallImgURL,
    isModalOpen: false,
  };

  // toggleModal = () => {
  //   this.setState(showModal => ({
  //     showModal: !showModal,
  //   }));
  // };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isModalOpen) {
      window.addEventListener('keydown', this.onModalKeydown);
    } else window.removeEventListener('keydown', this.onModalKeydown);
  }

  onModalKeydown = e => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    // console.log(largeImageURL);
    const { webformatURL, largeImageURL, tags, id } = this.props.image;
    return (
      <li className="gallery-item">
        <img src={webformatURL} alt={id} onClick={this.openModal} />
        {this.state.isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            about={tags}
            onModalClose={this.closeModal}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImgURL: PropTypes.string.isRequired,
};
