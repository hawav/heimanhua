import fetch from 'isomorphic-unfetch';
import React, { Component } from 'react';
import { initGA, logPageView } from '../../utils/analytics';

function getPictures(chapterAddr, start, end) {
  const pictures = [];
  for (let i = start; i <= end; ++i) {
    pictures.push(
      `http://mhpic.xiaomingtaiji.net/comic/${chapterAddr}/${i}.jpg-zymk.middle`
    );
  }
  return pictures;
}

export default class View extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }
  render() {
    const c = this.props.chapterInfo;
    return (
      (c && (
        <div>
          <img />
          <div className='text-center'>
            {/* <button className='mb-2 border-b w-full py-2'>上一章</button> */}
            {getPictures(c.chapter_addr, c.start_var, c.end_var).map(src => (
              <img key={src} src={src} className='mx-auto max-w-full' />
            ))}
            {/* <button className='mt-2 border-t w-full py-2'>下一章</button> */}
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
    return { props: { chapterInfo: data.data } };
  } else return { props: {} };
}
