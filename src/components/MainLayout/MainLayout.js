import React, { Component } from 'react';
import styles from './MainLayout.css';
// import classNames from 'classnames';
import Content from '@components/content';
import Footer from '@components/footer';
import Header from '@components/Header';
// import ImageSlider from '@components/ImageSlider';


export default class MainLayout extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Header />
        {/* <ImageSlider/> */}
        <Content />
        <Footer/>
      </div>
    );
  }
}

