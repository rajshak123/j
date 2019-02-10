import React, { Component } from 'react';
import styles from './index.css';
import data from './movies.json';
import underscore from 'underscore';
import Card from '@components/Card';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class content extends Component {

  constructor(props) { 
    super(props);
    this.state = {
      availData: [],
      disData: [],
      page: 0,
      end:0
    };
  }
  getUniq = (data) => {
    return new Promise((resolve, reject) => {
      let sdata = underscore.uniq(data, 'movie_title');
      if (data) {
        resolve(sdata);
      }
      else { 
        reject();
      }
    });
  }
  getDisplayData = () => {
    if (this.state.page == 50) {
      this.setState({
        end: 1
      });
    }
    else { 
      let start = this.state.page * 10;
      let end = this.state.page * 10 + 10;
      let newData = this.state.availData.slice(start+1, end);
      let d=newData.map(el => {
        let key = `${el['movie_imdb_link']}${el['movie_title']}${el['title_year']}`;
        return (
          <Card
            key={key}
            movie_title={el['movie_title']}
            title_year={el['title_year']}
            director_name={el['director_name']}
            genres={el['genres']}
            budget={this.formatMoney(el['budget'])}
            content_rating={el['content_rating']}
            actor_1_name={el['actor_1_name']}
            actor_2_name={el['actor_2_name']}
            language={el['language']}
            movie_imdb_link={el['movie_imdb_link']}
          />
        );
      });
      this.setState({
        disData: [ this.state.disData, ...d ],
        page: this.state.page + 1
      });
    }
  }
  componentDidMount = () => {
    this.getUniq(data).then(res => {
      let Ca = res.slice(0, 10);
      let d=Ca.map(el => {
        let key = `${el['movie_imdb_link']}${el['movie_title']}${el['title_year']}`;
        return (
          <Card
            key={key}
            movie_title={el['movie_title']}
            title_year={el['title_year']}
            director_name={el['director_name']}
            genres={el['genres']}
            budget={this.formatMoney(el['budget'])}
            content_rating={el['content_rating']}
            actor_1_name={el['actor_1_name']}
            actor_2_name={el['actor_2_name']}
            language={el['language']}
            movie_imdb_link={el['movie_imdb_link']}
          />
        );
      });
      this.setState({
        availData: res,
        disData: d,
        page: 1
      });
    });
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom){ 
      this.getDisplayData();
      // this.search();
    }
  }


  formatMoney=(amount, decimalCount = 2, decimal = '.', thousands = ',') =>{
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
      const negativeSign = amount < 0 ? '-' : '';
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');
    } catch (e) {
      console.log(e);
    }
  }
  searchT = (term) => {
    let obj = this.state.availData.filter(obj => obj['movie_title'].toLowerCase().includes(term));
    console.log(obj);
    return obj.map(el => {
      let key = `${el['movie_imdb_link']}${el['movie_title']}${el['title_year']}`;
      return (
        <Card
          key={key}
          movie_title={el['movie_title']}
          title_year={el['title_year']}
          director_name={el['director_name']}
          genres={el['genres']}
          budget={this.formatMoney(el['budget'])}
          content_rating={el['content_rating']}
          actor_1_name={el['actor_1_name']}
          actor_2_name={el['actor_2_name']}
          language={el['language']}
          movie_imdb_link={el['movie_imdb_link']}
        />
      );
    });
  }

  sortT = (term) => { 
    let a = {
      'Country': 'country',
      'Budget': 'budget',
      'Year': 'title_year'
    };
    let obj=underscore.sortBy(this.state.availData, a[term]);
    return obj.map(el => {
      let key = `${el['movie_imdb_link']}${el['movie_title']}${el['title_year']}`;
      return (
        <Card
          key={key}
          movie_title={el['movie_title']}
          title_year={el['title_year']}
          director_name={el['director_name']}
          genres={el['genres']}
          budget={this.formatMoney(el['budget'])}
          content_rating={el['content_rating']}
          actor_1_name={el['actor_1_name']}
          actor_2_name={el['actor_2_name']}
          language={el['language']}
          movie_imdb_link={el['movie_imdb_link']}
        />
      );
    });
  }



  render() {
    let d = null;
    if (this.props.searchTerm) {
      d = this.searchT(this.props.searchTerm);
    }
    // if (this.props.sort) { 
    //   d=this.sortT(this.props.sort);
    // }
    else { 
      d = this.state.disData;
    }
    return (
      <div id='content' className={styles.content}>
        {d}
      </div>
    );
  }
}


content.propTypes = {
  searchTerm: PropTypes.string,
  sort:PropTypes.string
};


function mapStateToProps(state) {
  console.log(state);
  return {
    searchTerm: state.slider.searchTerm,
    sort:state.slider.sort
  };
}



export default compose(
  connect(mapStateToProps, null)
)(content);
