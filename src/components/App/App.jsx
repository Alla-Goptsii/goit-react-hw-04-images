import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { fetchImg } from '../../services/api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Container } from './App.styled';

export default class App extends Component {
  state = {
    imageName: '',
    gallery: [],
    error: '',
    status: 'idle',
    page: 1,
    totalHits: null,
  };

  componentDidUpdate(_, pervState) {
    const prevName = pervState.imageName;
    const nextName = this.state.imageName;
    const { imageName, page, status } = this.state;

    if ((prevName !== nextName || pervState.page) !== this.state.page) {
      this.setState({ status: 'pending' });
      fetchImg(imageName, page, status).then(data => {
        if (data.hits.lenght === 0) {
          toast.error('Nothing was found for your request');
        } else {
          this.setState({ status: 'resolved' });
        }
        const selectedProperties = data.hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );

        this.setState(prevState => {
          return {
            gallery: [...prevState.gallery, ...selectedProperties],
            status: 'resolved',
            totalHits: this.state.gallery.total,
          };
        });
      });
    }
  }

  hadleSearchFormSubmit = imageName => {
    this.setState({ imageName });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { gallery, status, error } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    return (
      <Container>
        <Searchbar onSubmit={this.hadleSearchFormSubmit}></Searchbar>
        {error && <h1>{error.message}</h1>}
        <ToastContainer autoClose={2000} />
        {gallery.length > 0 && <ImageGallery gallery={gallery} />}
        {this.state.status === 'resolved' && <Button onClick={this.loadMore} />}
      </Container>
    );
  }
}
