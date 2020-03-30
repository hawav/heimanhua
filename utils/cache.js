import fetch from 'isomorphic-unfetch';

const cache = new Map();

Object.fromEntries =
  Object.fromEntries ||
  (map => {
    const result = {};
    for (const e of map.entries()) {
      result[e[0]] = e[1];
    }
    return result;
  });

if (typeof localStorage !== 'undefined') {
  const _raw = localStorage.getItem('cache');
  if (_raw) {
    try {
      const _cache = JSON.parse(_raw);
      Object.getOwnPropertyNames(_cache).forEach(n => {
        cache.set(n, _cache[n]);
      });
    } catch {
      localStorage.removeItem('cache');
    }
  }
  // localStorage.setItem('cache', '布吉岛');
  window.addEventListener('beforeunload', () => {});
  window.show = () => {
    console.log(JSON.stringify(Object.fromEntries(cache)));
  };
}

const expiration = 1000 * 120;

async function networkFetch(url) {
  try {
    const result = await fetch(url);
    const value = await result.text();
    cache.set(url, { updateAt: Date.now(), value });
    if (typeof localStorage !== 'undefined')
      localStorage.setItem('cache', JSON.stringify(Object.fromEntries(cache)));
    return value;
  } catch (err) {
    console.error(err);
  }
}

function wrap(text) {
  return {
    text,
    get json() {
      try {
        return JSON.parse(text);
      } catch {
        console.error(text);
      }
    }
  };
}

export async function cacheFetch(url) {
  console.log('正在请求网址：' + url);
  const _cache = cache.get(url);
  if (_cache) {
    if (_cache.updateAt) {
      if (_cache.updateAt + expiration < Date.now()) {
        // 过期
        console.log('缓存过期');
        networkFetch(url);
      }
    }
    console.log('缓存命中');
    return wrap(_cache.value);
  } else {
    console.log('未缓存');
    return wrap(await networkFetch(url));
  }
}
