import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import ImageGallery from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Container } from './App.styled';

export default class App extends Component {
  state = {
    imageName: '',
    URL: 'https://pixabay.com/api/',
    API_KEY: '29905727-ba938f57a9499389ab5e34ef4',
    gallery: [],
    error: '',
    status: 'idle',
    page: 1,
    totalHits: null,
  };

  fetchImg = () => {
    setTimeout(() => {
      return fetch(
        `${this.state.URL}?q=${this.state.imageName}&page=${this.state.page}&key=${this.state.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) return response.json();

          return Promise.reject(
            new Error(`Nothing was found for your request`)
          );
        })
        .then(gallery => {
          if (!gallery.total) {
            toast.error('Nothing was found for your request');
          }
          const selectedProperties = gallery.hits.map(
            ({ id, largeImageURL, webformatURL, tags }) => {
              return { id, largeImageURL, webformatURL, tags };
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
        .catch(error => this.setState({ error, status: 'rejected' }));
    }, 1000);
  };

  componentDidUpdate(prevProps, pervState) {
    const prevName = pervState.imageName;
    const nextName = this.state.imageName;

    if (prevName !== nextName) {
      this.setState({ status: 'pending', gallery: [], page: 1 });
      this.fetchImg();
    }
    if (pervState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      this.fetchImg();
    }
  }

  hadleSearchFormSubmit = imageName => {
    this.setState({ imageName });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { gallery, totalHits, status, error } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    return (
      <Container>
        <Searchbar onSubmit={this.hadleSearchFormSubmit}></Searchbar>
        {error && <h1>{error.message}</h1>}
        <ToastContainer autoClose={2000} />
        {gallery.length > 0 && <ImageGallery gallery={gallery} />}
        {totalHits > gallery.length && <Button onClick={this.loadMore} />}
      </Container>
    );
  }
}
