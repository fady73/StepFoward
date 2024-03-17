import Container from 'components/Container';
import Link from 'next/link';
import Socials from 'components/Socials';
import siteData from 'siteData';

export default function Navbar() {
  return (
    <div className="fixed z-50 w-full bg-white border-b">
      <Container>
        <div className="flex justify-between w-full py-4 px-2 lg:px-28 sm:px-8">
          <Link href="/" passHref>
            <div className="text-xl font-bold cursor-pointer">{siteData?.author}</div>
          </Link>
          <Socials />
        </div>
      </Container>
    </div>
  );
}
