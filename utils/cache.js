import fetch from 'isomorphic-unfetch';

const cache = new Map();

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
  const result = await fetch(url);
  const value = await result.text();
  cache.set(url, { updateAt: Date.now(), value });
  if (typeof localStorage !== 'undefined')
    localStorage.setItem('cache', JSON.stringify(Object.fromEntries(cache)));
  return value;
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
  const _cache = cache.get(url);
  if (_cache) {
    if (_cache.updateAt) {
      if (_cache.updateAt + expiration < Date.now()) {
        // 过期
        networkFetch(url);
      }
    }
    return wrap(_cache.value);
  } else {
    return wrap(await networkFetch(url));
  }
}
