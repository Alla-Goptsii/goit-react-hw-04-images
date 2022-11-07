import PropTypes from 'prop-types';

export function Button({ onClick }) {
  // console.log(gallery);

  return (
    <button type="button" onClick={onClick} className="button">
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
