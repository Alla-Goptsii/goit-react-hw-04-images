import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export function ImageGallery({ gallery }) {
  return (
    <Gallery>
      {gallery.map(image => {
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

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
};
