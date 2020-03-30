import { NextSeo } from 'next-seo';
import React, { Component } from 'react';
import ChapterList from '../../components/ChapterList';
import { getImageUrl } from '../../utils/ComicUtils';
import { initGA, logPageView } from '../../utils/analytics';
import { cacheFetch } from '../../utils/cache';
import { withRouter } from 'next/router';

// import { Container } from './styles';

export class ComicDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'chapter'
    };
  }

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    setTimeout(this.fetch.bind(this), 0);
  }

  async fetchDetail(id) {
    const result = await cacheFetch(location.origin + '/api/detail?id=' + id);
    this.setState(() => ({
      comic: result.json
    }));
  }

  async fetchChapterList(id) {
    const result = await cacheFetch(
      location.origin + '/api/getChapterList?id=' + id
    );
    this.setState(() => ({
      chapters: result.json
    }));
  }

  fetch() {
    const { id } = this.props.router.query;
    if (id) {
      this.fetchDetail(id);
      this.fetchChapterList(id);
    } else {
      console.log('找不到id');
    }
  }

  render() {
    return (
      (this.state.comic && (
        <div>
          <NextSeo
            title={'嘿，漫画！' + this.state.comic.comic_name}
            description={this.state.comic.comic_desc + '-嘿，漫画！'}
          />
          <div className='flex bg-indigo-500 text-white px-3 mb-20 pt-6'>
            <div style={{ width: '8rem' }}></div>
            <img
              src={getImageUrl(this.state.comic.comic_id)}
              className='absolute border border-white shadow'
              style={{ width: '100%', cursor: 'pointer', width: '8rem' }}
            />
            <div className='mt-3 mx-2 pb-8'>
              <h1 className='text-2xl'>{this.state.comic.comic_name}</h1>
              <p>{this.state.comic.author_name}</p>
            </div>
          </div>
          <div className='grid grid-cols-3 text-center border-b pb-1'>
            <span></span>
            <span>目录</span>
            <span></span>
          </div>
          <div className='px-2'>
            {this.state.view === 'chapter' && this.state.chapters && (
              <ChapterList
                id={this.state.comic.comic_id}
                chapters={this.state.chapters}
              />
            )}
          </div>
        </div>
      )) || <div>加载中</div>
    );
  }
}

export default withRouter(ComicDetail);

// export async function getServerSideProps(ctx) {
//   if (+ctx.query.id) {
//     const chaptersRes = await cacheFetch(
//       'https://www.zymk.cn/nodeapi/comic/chapterList?id=' + ctx.query.id
//     );
//     const chapters = (await chaptersRes.json).data;
//     const comicRes = await cacheFetch(
//       'https://www.zymk.cn/nodeapi/comic/detail?id=' + ctx.query.id
//     );
//     const comic = (await comicRes.json).data;
//     return { props: { comic, chapters } };
//   } else return { props: {} };
// }
