import { ComicCard } from './ComicCard';

export const ComicListView = ({ comics }) => {
  return (
    <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3' style={{gridGap:'2vw 2vw', margin:'3vw 3vw'}}>
      {comics.map((c, i) => (
        <ComicCard comic={c} key={i} />
      ))}
    </div>
  );
};
