import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class Searchbar extends Component {
  state = {
    imageName: '',
  };
  handleImageNameSearch = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });

    console.log(this.state);
  };

  handleSabmit = e => {
    e.preventDefault();

    if (this.state.imageName.trim() === '') {
      //   alert('Enter a search query');
      toast.error('Enter a search query');
      return;
    }
    this.props.onSubmit(this.state.imageName);

    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSabmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            value={this.state.imageName}
            onChange={this.handleImageNameSearch}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
