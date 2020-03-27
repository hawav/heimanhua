import React, { Component } from 'react';
import { ComicListView } from '../components/ComicListView';
import { initGA, logPageView } from '../utils/analytics';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comic: props.comic
    };
  }

  handleSearch = e => {
    const reg = new RegExp(e.target.value);
    this.setState({
      comic: this.props.comic.filter(c => reg.test(c.comic_name))
    });
  };

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    return (
      this.state.comic && (
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
      )
    );
  }
}

export async function getServerSideProps(ctx) {
  // const res = await fetch('http://192.168.1.82:3000/api/getComics');

  const result = await fetch('https://www.zymk.cn/nodeapi/comic/allComic/');
  const data = await result.json();
  return {
    props: {
      comic: data.data
    }
  };
}
