import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
// import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  // state = {
  //   gallery: [],
  // };

  render() {
    console.log(this.props.gallery);

    return (
      <ul className="gallery">
        {this.props.gallery.map(image => {
          return (
            <ImageGalleryItem
              key={nanoid()}
              smallImgURL={image.webformatURL}
              id={image.id}
            />
          );
        })}
      </ul>
    );
  }
}
