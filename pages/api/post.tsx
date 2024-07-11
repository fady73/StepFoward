/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from 'next';
import { convertToArticleList, getAllArticles, notion } from 'utils/notion';

import { NextResponse } from 'next/server';

const fetchPageBlocks = pageId => {
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

  console.log(req.query.searchQuery);
  const data = await getAllArticles(
    req.query.nextCursor ? req.query.nextCursor : undefined,
    req.query.selectedTag ? req.query.selectedTag : undefined,
    req.query.searchQuery ? req.query.searchQuery : undefined
  );
  console.log('data', data);

  if (data.response.length !== 0) {
    const { response, hasMore, nextCursor } = data;
    const blocks = await fetchPageBlocks(response[0].id);

    const { articles, categories } = convertToArticleList(response);
    res.status(200).send({
      data,
      blocks,
      articles,
      categories,
      hasMore,
      nextCursor
    });
  } else {
    res.status(404).send({
      message: 'No articles found'
    });
  }
};
