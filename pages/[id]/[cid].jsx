import { NextSeo } from 'next-seo';
import { withRouter } from 'next/router';
import React, { Component } from 'react';
import { initGA, logPageView } from '../../utils/analytics';
import { cacheFetch } from '../../utils/cache';

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
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    setTimeout(this.fetch.bind(this), 0);
  }

  async fetchDetail(id, cid) {
    const result = await cacheFetch(
      location.origin + `/api/getChapterInfo?id=${id}&cid=${cid}`
    );
    this.setState(() => ({
      chapterInfo: result.json
    }));
  }

  async fetchChapterList(id, cid) {
    const result = await cacheFetch(
      location.origin + '/api/getChapterList?id=' + id
    );
    const chapters = result.json;
    const i = chapters.findIndex(c => c.chapter_id == cid);
    this.setState(() => ({
      prev: (i !== -1 && i < chapters.length - 1 && chapters[i + 1]) || null,
      next: (i > 0 && chapters[i - 1]) || null
    }));
  }

  fetch() {
    const { id, cid } = this.props.router.query;
    if (id) {
      this.fetchDetail(id, cid);
      this.fetchChapterList(id, cid);
    } else {
      console.log('找不到id');
    }
  }

  go(cid) {
    this.props.router.replace(
      '/[id]/[cid]/',
      `/${this.state.chapterInfo.comic_id}/${cid}`
    );
    const { id } = this.props.router.query;
    if (id) {
      this.fetchDetail(id, cid);
      this.fetchChapterList(id, cid);
    } else {
      console.log('找不到id');
    }
  }

  render() {
    const c = this.state.chapterInfo;
    return (
      (c && (
        <div>
          <NextSeo
            title={
              '嘿，漫画！' +
              this.state.chapterInfo.comic_name +
              '-' +
              this.state.chapterInfo.chapter_name
            }
            description={
              this.state.chapterInfo.comic_desc +
              '-' +
              this.state.chapterInfo.chapter_name +
              '-嘿，漫画！'
            }
          />
          <div className='text-center'>
            {this.state.prev && (
              <button
                className='mb-2 border-b w-full py-2'
                onClick={this.go.bind(this, this.state.prev.chapter_id)}
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
            {this.state.next && (
              <button
                className='mt-2 border-t w-full py-2'
                onClick={this.go.bind(this, this.state.next.chapter_id)}
              >
                下一章
              </button>
            )}
          </div>
        </div>
      )) || <div>加载中</div>
    );
  }
}

// export async function getServerSideProps(ctx) {
//   const { id, cid } = ctx.query;
//   if (+id && +cid) {
//     const result = await cacheFetch(
//       `https://www.zymk.cn/nodeapi/comic/chapterInfo?id=${id}&chapterId=${cid}`
//     );
//     const data = await result.json;
//     const chaptersRes = await cacheFetch(
//       'https://www.zymk.cn/nodeapi/comic/chapterList?id=' + id
//     );
//     const chapters = (await chaptersRes.json).data;
//     const i = chapters.findIndex(c => c.chapter_id == cid);
//     return {
//       props: {
//         chapterInfo: data.data,
//         prev: (i !== -1 && i < chapters.length - 1 && chapters[i + 1]) || null,
//         next: (i > 0 && chapters[i - 1]) || null
//       }
//     };
//   } else return { props: {} };
// }

export default withRouter(View);
