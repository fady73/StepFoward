/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from 'next';
import { convertToArticleList, getAllFilterArticles, notion } from 'utils/notion';

import { NextResponse } from 'next/server';

const fetchPageBlocks = (pageId: string) => {
  return notion.blocks.children.list({ block_id: pageId }).then(res => res.results);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const resw = NextResponse.next();

  // add the CORS headers to the response
  resw.headers.append('Access-Control-Allow-Credentials', 'true');
  resw.headers.append('Access-Control-Allow-Origin', '*'); // replace this your actual origin
  resw.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  resw.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  const data = await getAllFilterArticles(
    req.query.nextCursor ? req.query.nextCursor : undefined,
    req.query.selectedTag
  );

  const { response, hasMore, nextCursor } = data;
  const blocks = await fetchPageBlocks(response[0].id);

  const { articles, categories } = convertToArticleList(response);
  res.send({
    data,
    blocks,
    articles,
    categories,
    hasMore,
    nextCursor
  });
};
