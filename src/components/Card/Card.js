
import React, { Component } from 'react';
import styles from './index.css';
import PropTypes from 'prop-types';
import icon from './iconfinder_imdb_43153.png';


class Card extends Component {
  render() {
    
    return (
      <div className={styles.movie_card}>
        <div className={styles.info_section}>
          <div className={styles.badge3}>{this.props.content_rating}</div>
          <h1 className={styles.title} >{this.props.movie_title}</h1>
          <h4 className={styles.director}>{this.props.title_year}, {this.props.director_name}</h4>
          <h4 className={styles.director}>{this.props.actor_1_name}</h4>
          <h4 className={styles.actor2}>{this.props.actor_2_name}</h4>
          <span className={styles.minutes}>${this.props.budget}</span>
          <p className={styles.type}>{this.props.genres}</p>
          <p className={styles.badge}>{this.props.language}</p>
          <a className={styles.icon} href={this.props.movie_imdb_link}>
            <img  src={icon}></img>
          </a>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  title_year: PropTypes.string,
  movie_title: PropTypes.string,
  director_name: PropTypes.string,
  genres: PropTypes.string,
  budget: PropTypes.string,
  language: PropTypes.string,
  actor_1_name: PropTypes.string,
  actor_2_name: PropTypes.string,
  content_rating: PropTypes.string,
  movie_imdb_link:PropTypes.string
  
};

export default Card;
