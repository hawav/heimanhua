import React, { useState } from 'react';
import { fetchComics } from '../utils/ComicUtils';
import { ComicCard } from '../components/ComicCard';
import { ComicListView } from '../components/ComicListView';

const Home = props => {
  const [state, setState] = useState({ comic: props.comic });
  const handleSearch = e => {
    const reg = new RegExp(e.target.value);
    setState({ comic: props.comic.filter(c => reg.test(c.comic_name)) });
  };
  return (
    state.comic && (
      <div>
        <div className='px-10 py-5'>
          <input
            type='text'
            placeholder='输入关键字开始检索'
            className='py-2 px-3 bg-white border shadow rounded-full w-full text-center outline-none'
            onChange={handleSearch}
          />
        </div>
        <ComicListView comics={state.comic.slice(0, 50)} />
      </div>
    )
  );
};

export async function getServerSideProps(ctx) {
  // const res = await fetch('http://192.168.1.82:3000/api/getComics');

  const result = await fetch('https://www.zymk.cn/nodeapi/comic/allComic/');
  const data = await result.json();
  return { props: { comic: data.data } };
}

export default Home;
