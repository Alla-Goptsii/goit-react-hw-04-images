// import { Component } from 'react';
import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Input, ButtonSearch } from './Searchbar.styled';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleImageNameSearch = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleSabmit = e => {
    e.preventDefault();

    if (imageName.trim() === '') {
      toast.error('Enter a search query');
      return;
    }
    onSubmit(imageName);

    setImageName('');
  };

  return (
    <header className="searchbar">
      <Form onSubmit={handleSabmit}>
        <Input
          type="text"
          value={imageName}
          onChange={handleImageNameSearch}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <ButtonSearch type="submit">
          <span className="button-label">Search</span>
        </ButtonSearch>
      </Form>
    </header>
  );

  // export default class Searchbar extends Component {
  // state = {
  //   imageName: '',
  // };
  // handleImageNameSearch = e => {
  //   this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  // };

  // handleSabmit = e => {
  //   e.preventDefault();

  //   if (this.state.imageName.trim() === '') {
  //     toast.error('Enter a search query');
  //     return;
  //   }
  //   this.props.onSubmit(this.state.imageName);

  //   this.setState({ imageName: '' });
  // };

  // render() {
  //   return (
  //     <header className="searchbar">
  //       <Form onSubmit={this.handleSabmit}>
  //         <Input
  //           type="text"
  //           value={this.state.imageName}
  //           onChange={this.handleImageNameSearch}
  //           autoComplete="off"
  //           autoFocus
  //           placeholder="Search images and photos"
  //         />
  //         <ButtonSearch type="submit">
  //           <span className="button-label">Search</span>
  //         </ButtonSearch>
  //       </Form>
  //     </header>
  //   );
  // }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
