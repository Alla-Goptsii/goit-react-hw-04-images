import { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';

import { fetchImg } from '../../services/api';
import Searchbar from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Container } from './App.styled';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);

  const totalPages = Math.ceil(totalHits / 12);

  const hadleSearchFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setGallery([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (imageName === '') {
      return;
    }

    setStatus('pending');

    fetchImg(imageName, page).then(data => {
      if (data.hits.length < 1) {
        setStatus('rejected');
      }

      const selectedProperties = data.hits.map(
        ({ id, largeImageURL, webformatURL, tags }) => {
          return { id, largeImageURL, webformatURL, tags };
        }
      );
      setGallery(prev => [...prev, ...selectedProperties]);
      setStatus('resolved');
      setTotalHits(data.total);
      setError(error);
    });

    // if (status === 'pending') {
    //   return <Loader />;
    // }

    // if (status === 'rejected') {
    //   return setError(error);
    // }
  }, [imageName, page, error]);

  return (
    <Container>
      <Searchbar onSubmit={hadleSearchFormSubmit}></Searchbar>
      {totalPages === 0 && <ToastContainer autoClose={2000} />}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && <ImageGallery gallery={gallery} />}
      {totalPages > page && <Button onClick={loadMore} />}
    </Container>
  );
}
