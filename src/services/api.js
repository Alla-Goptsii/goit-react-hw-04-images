import axios from 'axios';
import { toast } from 'react-toastify';

const API_KEY = '29905727-ba938f57a9499389ab5e34ef4';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImg = async (imageName, page, status) => {
  try {
    const response = await axios.get(
      `?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (response.data.hits.length === 0) {
      status = 'rejected';
      toast.error('Nothing was found for your request');
    }
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
