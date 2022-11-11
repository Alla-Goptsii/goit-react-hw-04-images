import axios from 'axios';

const API_KEY = '29905727-ba938f57a9499389ab5e34ef4';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImg = async (imageName, page, setStatus) => {
  try {
    const response = await axios.get(
      `?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (response.data.hits.length < 1) {
      console.log(response.data);
      setStatus('rejected');
    }
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
// .then(response => {
//   return response.data;
// });

// fetchImg = () => {
//   return fetch(
//     `${this.state.URL}?q=${this.state.imageName}&page=${this.state.page}&key=${this.state.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   )
//     .then(response => {
//       if (response.ok) return response.json();

//       return Promise.reject(new Error(`Nothing was found for your request`));
//     })
//     .then(gallery => {
//       if (!gallery.total) {
//         toast.error('Nothing was found for your request');
//       }
//       const selectedProperties = gallery.hits.map(
//         ({ id, largeImageURL, webformatURL, tags }) => {
//           return { id, largeImageURL, webformatURL, tags };
//         }
//       );
//       this.setState(prevState => {
//         return {
//           gallery: [...prevState.gallery, ...selectedProperties],
//           status: 'resolved',
//           totalHits: gallery.total,
//         };
//       });
//     })
//     .catch(error => this.setState({ error, status: 'rejected' }));
// };
