import Container from './Container';
import Image from 'next/image';
import siteData from 'siteData';

export default function HeroHeader({ blog }: any) {
  return (
    <div className="py-24 text-center bg-gray-100">
      <Container>
        {siteData?.profileUrl && (
          <img
            src={siteData.profileUrl}
            className="mx-auto "
            width={150}
            height={150}
            alt="profile"
          />
        )}
        <div className="mt-4 text-3xl font-extrabold text-gray-900">
          {siteData?.headerTitle}
        </div>
        <div className="max-w-2xl mx-auto mt-2 text-xl text-gray-500">
          {siteData?.headerDescription}
        </div>
      </Container>
    </div>
  );
}
