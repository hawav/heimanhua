import fetch from 'isomorphic-unfetch';

export async function fetchComics() {
  const res = await fetch('https://www.zymk.cn/nodeapi/comic/allComic/');
  const data = (await res.json()).data;
  if (res.status === 200) return data;
  throw res.text();
}

export function getImageUrl(id) {
  // https://image.zymkcdn.com/file/cover/000/003/623.jpg-300x400
  const fz = n => {
    if (n < 10) return '00' + n;
    else if (n < 100) return '0' + n;
    return n;
  };
  const c = fz(id % 1000);
  id = Math.floor(id / 1000);
  const b = fz(id % 1000);
  id = Math.floor(id / 1000);
  const a = fz(id % 1000);
  return `https://image.zymkcdn.com/file/cover/${a}/${b}/${c}.jpg-300x400`;
}
