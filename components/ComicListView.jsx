import { ComicCard } from './ComicCard';

export const ComicListView = ({ comics }) => {
  return (
    <div
      className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3'
      style={{ gridGap: '2vw', margin: '0 3vw' }}
    >
      {comics.map(c => (
        <ComicCard comic={c} key={c.comic_id} />
      ))}
    </div>
  );
};
