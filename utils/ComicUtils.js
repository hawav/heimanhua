import { cacheFetch } from './cache';
// let baseUrl = 'http://proxy.hawav.cn:2000';
let baseUrl;
if (typeof window !== 'undefined') {
  baseUrl = location.origin + '/api';
}

export function fetchComics() {
  return cacheFetch(baseUrl + '/getComics');
}

export function comicDetail(id) {
  return cacheFetch(baseUrl + '/detail?id=' + id);
}

export function chapterList(id) {
  return cacheFetch(baseUrl + '/getChapterList?id=' + id);
}

export function chapterInfo(id, cid) {
  return cacheFetch(baseUrl + `/getChapterInfo?id=${id}&cid=${cid}`);
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
