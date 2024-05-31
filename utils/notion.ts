import {
  APIErrorCode,
  Client,
  ClientErrorCode,
  isNotionClientError
} from '@notionhq/client';

import { createFilter } from './utlis';
import slugify from 'slugify';

export const notion = new Client({
  auth: process.env.NOTION_SECRET
});
/**property: 'categories',
          multi_select: {
            
            contains: "شباب",
          }, */

export const getAllArticles = async (cursor = undefined, filter = null,searchQuery) => {
  try {
    let response = await notion.databases.query({
      database_id: process.env.BLOG_DATABASE_ID,
      filter: createFilter(filter, searchQuery),
      page_size: Number(process.env.NEXT_PUBLIC_TOTAL_PAGE_SIZE),
      start_cursor: cursor
    });

    return {
      response: response.results,
      hasMore: response.has_more,
      nextCursor: response.next_cursor
    };
  } catch (error) {
    if (isNotionClientError(error)) {
      // error is now strongly typed to NotionClientError

      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          // ...
          break;
        case APIErrorCode.ObjectNotFound:
          // ...
          break;
        case APIErrorCode.Unauthorized:
          // ...
          break;
        // ...
        default:
          // you could even take advantage of exhaustiveness checking
          'error';
      }
    }
  }
};

export const getOneArticles = async (databaseId, slug) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'status',
          select: {
            equals: '✅ Published'
          }
        },
        {
          property: 'slug',
          text: {
            equals: slug
          }
        }
      ]
    }
  });

  return response.results;
};
export const mapArticleProperties = article => {
  const { id, properties } = article;

  return {
    id: id,
    title: properties?.title.title[0].plain_text || '',
    categories:
      properties?.categories?.multi_select.map((category: any) => category.name) || [],
    thumbnail: properties?.imageSrc.rich_text[0]?.plain_text ?? '',
    publishedDate: properties?.published?.date?.start,
    lastEditedAt: properties?.LastEdited?.last_edited_time,
    summary: properties?.summary.rich_text[0]?.plain_text ?? '',
    imageSrc: properties?.imageSrc.rich_text[0]?.plain_text ?? '',
    slug: properties?.slug.rich_text[0]?.plain_text ?? ''
  };
};

export const convertToArticleList = (tableData: any) => {
  let categories: string[] = [];

  const articles = tableData.map((article: any) => {
    const { properties } = article;

    properties?.categories?.multi_select?.forEach((category: any) => {
      const { name } = category;
      if (!categories.includes(name) && name) {
        categories.push(name);
      }
    });

    return mapArticleProperties(article);
  });

  return { articles, categories };
};

export const getMoreArticlesToSuggest = async (databaseId, currentArticleTitle) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'status',
          select: {
            equals: '✅ Published'
          }
        },
        {
          property: 'slug',
          text: {
            does_not_equal: currentArticleTitle
          }
        },
        
        
      ]
    }
  });

  const moreArticles = response.results.map((article: any) =>
    mapArticleProperties(article)
  );

  return shuffleArray(moreArticles).slice(0, 3);
};

export function shuffleArray(array: Array<any>) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    // Pick a random element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export const getArticlePageData = async (page: any, slug: any, databaseId) => {
  let content = [];
  let title = '';

  title = page.properties.title.title[0].plain_text;

  const moreArticles: any = await getMoreArticlesToSuggest(databaseId, slug);
  let blocks = await notion.blocks.children.list({
    block_id: page.id
  });

  content = [...blocks.results];

  while (blocks.has_more) {
    blocks = await notion.blocks.children.list({
      block_id: page.id,
      start_cursor: blocks.next_cursor
    });

    content = [...content, ...blocks.results];
  }

  return {
    ...mapArticleProperties(page),
    content,
    slug,
    moreArticles
  };
};

export const getAllFilterArticles = async (cursor = undefined, filter = null) => {
  try {
    let response = await notion.databases.query({
      database_id: process.env.BLOG_DATABASE_ID,
      filter: {
        property: 'categories',
        multi_select: {
          contains: filter
        }
      },
      page_size: Number(process.env.NEXT_PUBLIC_TOTAL_PAGE_SIZE),
      start_cursor: cursor
    });

    return {
      response: response.results,
      hasMore: response.has_more,
      nextCursor: response.next_cursor
    };
  } catch (error) {
    if (isNotionClientError(error)) {
      // error is now strongly typed to NotionClientError

      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          // ...
          break;
        case APIErrorCode.ObjectNotFound:
          // ...
          break;
        case APIErrorCode.Unauthorized:
          // ...
          break;
        // ...
        default:
          // you could even take advantage of exhaustiveness checking
          'error';
      }
    }
  }
};
