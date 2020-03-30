import React, { Component } from 'react';
import { ComicListView } from '../components/ComicListView';
import { initGA, logPageView } from '../utils/analytics';
import { cacheFetch } from '../utils/cache';
import { fetchComics } from '../utils/ComicUtils';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: props.comic,
      log: []
    };
  }

  handleSearch = e => {
    const reg = new RegExp(e.target.value);
    const result = this.state.origin.filter(c => reg.test(c.comic_name));
    if (result.length) {
      this.setState({
        comic: result
      });
    }
  };

  log(text) {
    const log = this.state.log;
    log.push(new Date().toLocaleTimeString() + '：' + text);
    this.setState({ log });
  }

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();

    const error = window.console.error;
    window.console.error = (...message) => {
      error(...message);
      this.log('发生错误：' + message.join(' '));
    };
    const log = window.console.log;
    window.console.log = (...message) => {
      log(...message);
      this.log(message.join(' '));
    };
    this.log('正在加载，请稍等。');
    try {
      fetchComics().then(result => {
        this.log('加载完毕。');
        const origin = result.json;
        this.setState({ origin, comic: origin });
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      (this.state.comic && (
        <div>
          <div className='px-10 py-5'>
            <input
              type='text'
              placeholder='输入关键字开始检索'
              className='py-2 px-3 bg-white border shadow rounded-full w-full text-center outline-none'
              onChange={this.handleSearch.bind(this)}
            />
          </div>
          <ComicListView
            comics={this.state.comic
              .sort((c1, c2) => +c2.total_click - +c1.total_click)
              .slice(0, 250)}
          />
        </div>
      )) || (
        <div className='text-gray-600'>
          {this.state.log.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>
      )
    );
  }
}

// export async function get

// export async function _getServerSideProps(ctx) {
//   // const res = await fetch('http://192.168.1.82:3000/api/getComics');

//   const result = await cacheFetch(
//     'https://www.zymk.cn/nodeapi/comic/allComic/'
//   );
//   const data = await result.json;
//   return {
//     props: {
//       comic: data.data
//     }
//   };
// }
