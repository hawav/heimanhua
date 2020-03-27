import { NextSeo } from 'next-seo';
import React, { Component } from 'react';
import ChapterList from '../../components/ChapterList';
import { getImageUrl } from '../../utils/ComicUtils';
import { initGA, logPageView } from '../../utils/analytics';

// import { Container } from './styles';

export default class ComicDetail extends Component {
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
  }

  render() {
    return (
      (this.props.comic && (
        <div>
          <NextSeo
            title={this.props.comic.comic_name + '-嘿，漫画！'}
            description={this.props.comic.comic_desc + '-嘿，漫画！'}
          />
          <div className='flex bg-indigo-500 text-white px-3 mb-20 pt-6'>
            <div style={{ width: '8rem' }}></div>
            <img
              src={getImageUrl(this.props.comic.comic_id)}
              className='absolute border border-white shadow'
              style={{ width: '100%', cursor: 'pointer', width: '8rem' }}
            />
            <div className='mt-3 mx-2 pb-8'>
              <h1 className='text-2xl'>{this.props.comic.comic_name}</h1>
              <p>{this.props.comic.author_name}</p>
            </div>
          </div>
          <div className='grid grid-cols-3 text-center border-b pb-1'>
            <span></span>
            <span>目录</span>
            <span></span>
          </div>
          <div className='px-2'>
            {this.state.view === 'chapter' && (
              <ChapterList
                id={this.props.comic.comic_id}
                chapters={this.props.chapters}
              />
            )}
          </div>
        </div>
      )) || <div>Not found</div>
    );
  }
}

export async function getServerSideProps(ctx) {
  if (+ctx.query.id) {
    const chaptersRes = await fetch(
      'https://www.zymk.cn/nodeapi/comic/chapterList?id=' + ctx.query.id
    );
    const chapters = (await chaptersRes.json()).data;
    const comicRes = await fetch(
      'https://www.zymk.cn/nodeapi/comic/detail?id=' + ctx.query.id
    );
    const comic = (await comicRes.json()).data;
    return { props: { comic, chapters } };
  } else return { props: {} };
}
