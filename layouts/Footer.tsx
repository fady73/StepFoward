import Container from 'components/Container';
import Socials from 'components/Socials';
import siteData from 'siteData';

export default function Footer() {
  return (
    <footer className="py-16 bg-white border-t">
      <Container>
        <div className="md:flex md:items-center md:justify-between py-4 px-2 lg:px-28 sm:px-8">
          <Socials />
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-base text-center text-gray-400">{siteData?.footerText}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
