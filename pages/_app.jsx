import React, { Component } from 'react';
import '../tailwind.css';

class MyApp extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   window.dataLayer = window.dataLayer || [];
  //   function gtag() {
  //     window.dataLayer.push(arguments);
  //   }
  //   gtag('js', new Date());

  //   gtag('config', 'UA-153477912-2');
  // }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
