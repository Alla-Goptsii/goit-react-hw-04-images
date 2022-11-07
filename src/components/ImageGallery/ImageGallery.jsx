import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  // state = {
  //   gallery: [],
  // };

  render() {
    console.log(this.props.gallery);

    return (
      <ul className="gallery">
        {/* {this.props.images.map(img => {
          return( */}
        <ImageGalleryItem />
        {/* );
        })} */}
      </ul>
    );
  }
}
