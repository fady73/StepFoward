/* eslint-disable @next/next/no-img-element */

import { Article } from 'utils/types';
import Image from 'next/image';
import Link from 'next/link';
import getLocalizedDate from 'utils/getLocalizedDate';

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  const formattedTime = getLocalizedDate(article.publishedDate);

  return (
    <Link href={`/blog/${article.slug}`}>
      <div className="flex flex-col overflow-hidden cursor-pointer group">
        <div className="relative">
          <div className="absolute">
            {article?.categories?.map(category => (
              <div
                key={category}
                className="relative shadow z-[2] inline-flex items-center px-3 py-1.5 mb-2 mr-2 text-xs font-bold text-gray-600 uppercase bg-gray-100 rounded left-3 top-3"
              >
                {category}
              </div>
            ))}
          </div>
          <div className=" filter contrast-[0.9]">
            <img
              className="object-cover w-full h-48 transition rounded-lg aspect-video group-hover:opacity-90 bg-gray-50"
              src={article.thumbnail}
              alt={'article cover'}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between flex-1 py-4 bg-white">
          <div className="flex-1">
            <p className="text-xl font-semibold text-gray-900">{article.title}</p>
            <p className="mt-3 text-base text-gray-500 line-clamp-2">{article.summary}</p>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex mb-2 space-x-1 text-sm text-gray-400">
              {article?.categories?.map(category => (
                <div key={category}>
                  <span className="font-semibold text-gray-600">{category} </span>
                  <span aria-hidden="true">&middot;</span>
                </div>
              ))}
              <time dateTime={formattedTime}>{formattedTime}</time>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
