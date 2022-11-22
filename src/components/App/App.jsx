import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { fetchImg } from '../../services/api';
import Searchbar from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
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
        const selectedProperties = data.hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );
        const totalPages = Math.ceil(data.totalHits / 12);

        if (prevName !== nextName) {
          this.setState({ gallery: [] });
        }

        this.setState(prevState => {
          return {
            gallery: [...prevState.gallery, ...selectedProperties],
            status: 'resolved',
            totalPages: totalPages,
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
    const { gallery, status, totalPages, page, error } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return { error };
    }

    return (
      <Container>
        <Searchbar onSubmit={this.hadleSearchFormSubmit}></Searchbar>
        {totalPages === 0 && <ToastContainer autoClose={2000} />}
        {status === 'resolved' && <ImageGallery gallery={gallery} />}
        {totalPages > page && <Button onClick={this.loadMore} />}
      </Container>
    );
  }
}
