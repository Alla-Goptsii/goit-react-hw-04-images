import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import ImageGallery from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
export default class App extends Component {
  state = {
    imageName: '',
    loading: false,
    URL: 'https://pixabay.com/api/',
    API_KEY: '29905727-ba938f57a9499389ab5e34ef4',
    gallery: [],
    error: '',
    status: 'idle',
    page: 1,
    totalHits: null,
  };

  componentDidUpdate(prevProps, pervState) {
    const prevName = pervState.imageName;
    const nextName = this.state.imageName;
    const queryParams = `?q=${nextName}&page=1&key=${this.state.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const url = this.state.URL + queryParams;

    if (prevName !== nextName) {
      // console.log('Change name');
      // console.log('pervState.imageName', pervState.imageName);
      // console.log('this.state.imageName', this.state.imageName);
      this.setState({ loading: true });
      fetch(url)
        .then(res => res.json())
        .then(gallery => {
          if (!gallery.total) {
            toast.error('Nothing was found for your request');
          }
          const selectedProperties = gallery.hits.map(
            ({ id, largeImageURL, webformatURL }) => {
              return { id, largeImageURL, webformatURL };
            }
          );
          this.setState(prevState => {
            return {
              gallery: [...prevState.gallery, ...selectedProperties],
              status: 'resolved',
              totalHits: gallery.total,
            };
          });
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  hadleSearchFormSubmit = imageName => {
    // console.log(imageName);
    this.setState({ imageName });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { imageName, loading, gallery, totalHits } = this.state;
    return (
      <div>
        {loading && <div>Завантужуемо...</div>}
        <Searchbar onSubmit={this.hadleSearchFormSubmit}></Searchbar>
        <ToastContainer autoClose={2000} />
        {imageName && <p>{imageName} </p>}
        {gallery.length > 0 && <ImageGallery gallery={gallery} />}
        {totalHits > gallery.length && <Button onClick={this.handleLoadMore} />}
      </div>
    );
  }
}

// console.log(this.state.galery.hits), this.state.galery.hits.id;
