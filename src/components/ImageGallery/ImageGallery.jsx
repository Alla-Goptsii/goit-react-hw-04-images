import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
import { Gallery } from './ImageGallery.styled';
// import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  // state = {
  //   gallery: [],
  // };

  render() {
    console.log(this.props.gallery);

    return (
      <Gallery>
        {this.props.gallery.map(image => {
          return (
            <ImageGalleryItem
              key={nanoid()}
              webformatURL={image.webformatURL}
              id={image.id}
              largeImageURL={image.largeImageURL}
              tags={image.tags}
              image={image}
            />
          );
        })}
      </Gallery>
    );
  }
}
