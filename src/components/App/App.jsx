import { Component } from 'react';
// import { imagesFetch } from '../../services/api';
import Searchbar from '../Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import ImageGallery from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
// import { Modal } from '../Modal/Modal';

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
    // showModal: false,
  };

  componentDidUpdate(prevProps, pervState) {
    const prevName = pervState.imageName;
    const nextName = this.state.imageName;
    const queryParams = `?q=${nextName}&page=1&key=${this.state.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const url = this.state.URL + queryParams;

    if (prevName !== nextName) {
      console.log('Change name');
      console.log('pervState.imageName', pervState.imageName);
      console.log('this.state.imageName', this.state.imageName);
      this.setState({ status: 'pending', gallery: [], page: 1 });

      // imagesFetch()
      fetch(url)
        .then(response => {
          if (response.ok) return response.json();

          return Promise.reject(
            new Error(
              `Nothing was found for your request ${this.state.imageName}`
            )
          );
        })
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
              page: 1,
            };
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
      // .finally(() => this.setState({ loading: false }));
    }
  }

  hadleSearchFormSubmit = imageName => {
    this.setState({ imageName });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  // toggleModal = () => {
  //   this.setState(showModal => ({
  //     showModal: !showModal,
  //   }));
  // };

  render() {
    const { imageName, gallery, totalHits, status, error } = this.state;

    return (
      <div>
        {status === 'pending' && <Loader />}
        <Searchbar onSubmit={this.hadleSearchFormSubmit}></Searchbar>
        {error && <h1>{error.message}</h1>}
        <ToastContainer autoClose={2000} />
        {imageName && <p>{imageName} </p>}
        {gallery.length > 0 && <ImageGallery gallery={gallery} />}
        {totalHits > gallery.length && <Button onClick={this.handleLoadMore} />}
        {/* {showModal && <Modal onModalClose={this.toggleModal} />} */}
      </div>
    );
  }
}

// console.log(this.state.galery.hits), this.state.galery.hits.id;
// if (status === 'idle') {
//   <div>
//     <Searchbar onSubmit={this.hadleSearchFormSubmit}></Searchbar>;
//   </div>;
//   return <div>Введіть запит</div>;
// }
// if (status === 'panding') {
//   return <div>Завантужуемо...</div>;
// }
// if (status === 'rejected') {
//   return <div>{this.state.error.message}</div>;
// }
// if (status === 'resolved') {
//   return (
//     <div>
//       <Searchbar onSubmit={this.hadleSearchFormSubmit}></Searchbar>
//       <ToastContainer autoClose={2000} />
//       {imageName && <p>{imageName} </p>}
//       {gallery.length > 0 && <ImageGallery gallery={gallery} />}
//       {totalHits > gallery.length && (
//         <Button onClick={this.handleLoadMore} />
//       )}
//     </div>
//   );
// }
