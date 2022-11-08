// export function imagesFetch(imageName) {
//   const URL = 'https://pixabay.com/api/';
//   const API_KEY = '29905727-ba938f57a9499389ab5e34ef4';

//   const queryParams = `?q=${nextName}&page=1&key=${this.state.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
//   const url = this.state.URL + queryParams;

//   if (prevName !== nextName) {
//     this.setState({ status: 'pending', gallery: [], page: 1 });

//     return fetch(url).then(response => {
//       if (response.ok) return response.json();

//       return Promise.reject(
//         new Error(`Nothing was found for your request ${imageName}`)
//       );
//     });
//   }
// }

// const baseURL = 'https://pixabay.com/api';
// const API_KEY = '29905727-ba938f57a9499389ab5e34ef4';

// export function imagesFetch(imageName, page) {
//   return fetch(
//     `https://pixabay.com/api?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   ).then(response => {
//     return response.data;
//   });
// }
