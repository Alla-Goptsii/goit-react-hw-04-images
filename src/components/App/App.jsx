import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import ImageGallery from '../ImageGallery/ImageGallery';
export default class App extends Component {
  state = {
    imageName: '',
    loading: false,
  };

  componentDidUpdate(prevProps, pervState) {
    const prevName = pervState.imageName;
    const nextName = this.state.imageName;
    const BASE_URL = 'https://pixabay.com/api/';
    const queryParams = `?q=${nextName}&page=1&key=29926103-ef277a018e47056ded665dd02&image_type=photo&orientation=horizontal&per_page=12`;
    const url = BASE_URL + queryParams;

    if (prevName !== nextName) {
      // console.log('Change name');
      // console.log('pervState.imageName', pervState.imageName);
      // console.log('this.state.imageName', this.state.imageName);
      this.setState({ loading: true });
      fetch(url)
        .then(res => res.json())
        .then(gallery => this.setState({ gallery }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  hadleSearchFormSubmit = imageName => {
    // console.log(imageName);
    this.setState({ imageName });
  };

  // componentDidMount() {
  //   const queryParams = `?q=cat&page=1&key=29926103-ef277a018e47056ded665dd02&image_type=photo&orientation=horizontal&per_page=12`;
  //   const url = BASE_URL + queryParams;
  //   fetch(url)
  //     .then(galery => this.setState({ galery }));
  // }

  render() {
    const { imageName, loading } = this.state;
    return (
      <div>
        {loading && <div>Завантужуемо...</div>}
        <Searchbar onSubmit={this.hadleSearchFormSubmit}></Searchbar>
        <ToastContainer autoClose={2000} />
        {imageName && <p>{imageName} </p>}
        {<ImageGallery gallery={this.state.gallery} />}
      </div>
    );
  }
}

// console.log(this.state.galery.hits), this.state.galery.hits.id;
