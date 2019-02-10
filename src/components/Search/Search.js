import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  render() {
    return (
      <div className={styles.search}>
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

SearchBar.propTypes = {
  onSearchTermChange: PropTypes.func,
};
export default SearchBar;
