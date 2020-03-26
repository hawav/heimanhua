const fetch = require('isomorphic-unfetch');

export default async (req, res) => {
  const { id, cid } = req.query;
  if (!id || !cid) res.status(422).end('参数不完整');
  const result = await fetch(
    `https://www.zymk.cn/nodeapi/comic/chapterInfo?id=${id}&chapterId=${cid}`
  );
  const data = await result.json();
  res.json(data.data);
};
