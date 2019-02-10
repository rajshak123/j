import React, { Component } from 'react';
import styles from './Header.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '@actions';
import Search from '@components/Search';
import PropTypes from 'prop-types';
import underscore from 'underscore';
import Dropdown from 'react-dropdown';
class Header extends Component {
  
  videoSearch = (term) => {
    this.props.search(term);
  }
  
  _onSelect = (term) => {
    this.props.dropDown(term.value);
  }
  
  render() {
    const videoSearch = underscore.debounce(term => {
      this.videoSearch(term);
    }, 300);
    
    const options = [
      'Country', 'Budget', 'Year'
    ];
    const defaultOption = options[0];
    return (
      <div  className={styles.header} >
        <Search onSearchTermChange={videoSearch} />
        <div className={styles.dropdownContent}>
          <Dropdown
            options={options}
            onChange={this._onSelect}
            value={defaultOption}
            placeholder='Select an option' />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  search: PropTypes.func,
  dropDown:PropTypes.func
};

export default compose(
  connect(null, actions)
)(Header);

