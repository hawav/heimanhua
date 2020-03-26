import React, { useState } from 'react';
import { getImageUrl } from '../../utils/ComicUtils';
import ChapterList from '../../components/ChapterList';

// import { Container } from './styles';

export default function ComicDetail(props) {
  const [state, setState] = useState({ view: 'chapter' });
  const handleOnClick = () => {};
  return (
    (props.comic && (
      <div>
        <div className='flex bg-indigo-500 text-white px-3 mb-20 pt-6'>
          <div style={{ width: '8rem' }}></div>
          <img
            src={getImageUrl(props.comic.comic_id)}
            className='absolute border border-white shadow'
            style={{ width: '100%', cursor: 'pointer', width: '8rem' }}
            onClick={handleOnClick}
          />
          <div className='mt-3 mx-2 pb-8'>
            <h1 className='text-2xl'>{props.comic.comic_name}</h1>
            <p>{props.comic.author_name}</p>
          </div>
        </div>
        <div className='grid grid-cols-3 text-center border-b pb-1'>
          <span></span>
          <span>目录</span>
          <span></span>
        </div>
        <div className='px-2'>
          {state.view === 'chapter' && (
            <ChapterList id={props.comic.comic_id} />
          )}
        </div>
      </div>
    )) || <div>Not found</div>
  );
}

ComicDetail.getInitialProps = async ctx => {
  if (ctx.query.id) {
    const comic = (
      await (
        await fetch('http://192.168.1.82:3000/api/detail?id=' + ctx.query.id)
      ).json()
    );
    return { comic };
  }
};
