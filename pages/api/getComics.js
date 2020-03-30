import { cacheFetch } from '../../utils/cache';

export default async (req, res) => {
  const result = await cacheFetch(
    'https://www.zymk.cn/nodeapi/comic/allComic/'
  );
  const data = result.json;
  res.json(data.data);
};
