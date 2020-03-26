import { fetchComics } from '../utils/ComicUtils';
import { ComicCard } from '../components/ComicCard';
import { ComicListView } from '../components/ComicListView';

const Home = props => {
  return (
    <div>
      {props.comic && <ComicListView comics={props.comic.slice(0, 50)} />}
    </div>
  );
};

Home.getInitialProps = async ctx => {
  const res = await fetch('http://192.168.1.82:3000/api/getComics');
  const data = await res.json();
  if (res.status === 200) {
    return { comic: data };
  }
  throw res.text();
};

export default Home;
