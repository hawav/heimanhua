const fetch = require('isomorphic-unfetch');

export default async (req, res) => {
  const result = await fetch('https://www.zymk.cn/nodeapi/comic/allComic/');
  const data = await result.json();
  res.json(data.data);
};
