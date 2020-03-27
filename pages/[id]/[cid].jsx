import { NextSeo } from 'next-seo';
import fetch from 'isomorphic-unfetch';
import React, { Component } from 'react';
import { initGA, logPageView } from '../../utils/analytics';
import { withRouter } from 'next/router';

function getPictures(chapterAddr, start, end) {
  const pictures = [];
  for (let i = start; i <= end; ++i) {
    pictures.push(
      `http://mhpic.xiaomingtaiji.net/comic/${chapterAddr}/${i}.jpg-zymk.middle`
    );
  }
  return pictures;
}

export class View extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  go(cid) {
    this.props.router.replace(
      '/[id]/[cid]/',
      `/${this.props.chapterInfo.comic_id}/${cid}`
    );
  }

  render() {
    const c = this.props.chapterInfo;
    return (
      (c && (
        <div>
          <NextSeo
            title={
              '嘿，漫画！' +
              this.props.chapterInfo.comic_name +
              '-' +
              this.props.chapterInfo.chapter_name
            }
            description={
              this.props.chapterInfo.comic_desc +
              '-' +
              this.props.chapterInfo.chapter_name +
              '-嘿，漫画！'
            }
          />
          <div className='text-center'>
            {this.props.prev && (
              <button
                className='mb-2 border-b w-full py-2'
                onClick={this.go.bind(this, this.props.prev.chapter_id)}
              >
                上一章
              </button>
            )}
            <div className='grid xl:grid-cols-3 md:grid-cols-2'>
              {getPictures(c.chapter_addr, c.start_var, c.end_var).map(src => (
                <img
                  key={src}
                  src={src}
                  className='mx-auto max-w-full'
                  width='640px'
                />
              ))}
            </div>
            {this.props.next && (
              <button
                className='mt-2 border-t w-full py-2'
                onClick={this.go.bind(this, this.props.next.chapter_id)}
              >
                下一章
              </button>
            )}
          </div>
        </div>
      )) || <div>Not found</div>
    );
  }
}

export async function getServerSideProps(ctx) {
  const { id, cid } = ctx.query;
  if (+id && +cid) {
    const result = await fetch(
      `https://www.zymk.cn/nodeapi/comic/chapterInfo?id=${id}&chapterId=${cid}`
    );
    const data = await result.json();
    const chaptersRes = await fetch(
      'https://www.zymk.cn/nodeapi/comic/chapterList?id=' + id
    );
    const chapters = (await chaptersRes.json()).data;
    const i = chapters.findIndex(c => c.chapter_id == cid);
    return {
      props: {
        chapterInfo: data.data,
        prev: (i !== -1 && i < chapters.length - 1 && chapters[i + 1]) || null,
        next: (i > 0 && chapters[i - 1]) || null
      }
    };
  } else return { props: {} };
}

export default withRouter(View);
