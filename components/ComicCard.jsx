import { getImageUrl } from '../utils/ComicUtils';
import { useRouter } from 'next/router';

export const ComicCard = ({ comic }) => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push('/[id].jsx', `/${comic.comic_id}`);
  };
  return (
    <div>
      <img
        src={getImageUrl(comic.comic_id)}
        style={{ width: '100%', cursor: 'pointer' }}
        onClick={handleOnClick}
      />
      <div className='text-sm text-gray-800'>{comic.comic_name}</div>
      <span className='text-xs text-gray-600'>{comic.comic_name}</span>
      <style jsx>{`
        .text-title {
          color: #222;
          font-size: 0.8rem;
        }

        .text-minor {
          color: #444;
          font-size: 0.7rem;
        }
      `}</style>
    </div>
  );
};
