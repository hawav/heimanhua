import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
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

class View extends Component {
  static async getInitialProps(ctx) {
    const { id, cid } = ctx.query;
    const result = await fetch(
      `http://192.168.1.82:3000/api/getChapterInfo?id=${id}&cid=${cid}`
    );
    const data = await result.json();
    return { chapterInfo: data };
  }
  render() {
    const c = this.props.chapterInfo;
    return (
      <div>
        <img />
        <div className='text-center'>
          {/* <button className='mb-2 border-b w-full py-2'>上一章</button> */}
          {getPictures(c.chapter_addr, c.start_var, c.end_var).map(src => (
            <img src={src} className='mx-auto max-w-full' />
          ))}
          {/* <button className='mt-2 border-t w-full py-2'>下一章</button> */}
        </div>
      </div>
    );
  }
}

export default withRouter(View);
