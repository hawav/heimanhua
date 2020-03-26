const fetch = require('isomorphic-unfetch');

export default async (req, res) => {
  const { id } = req.query;
  if (!id) res.status(422).end('参数不完整');
  const result = await fetch(
    'https://www.zymk.cn/nodeapi/comic/chapterList?id=' + id
  );
  const data = await result.json();
  res.json(data.data);
};
