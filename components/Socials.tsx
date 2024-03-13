import siteData from 'siteData';
import Image from 'next/image';

export default function Socials() {
  const socials = [
    {
      name: 'Facebook',
      href: siteData?.facebook,
      icon: '/socials/facebook.svg'
    }
  ];

  return (
    <div className="flex justify-center space-x-6 md:order-2">
      {socials.map(item => (
        <a
          key={item.name}
          href={item.href}
          className="text-gray-400 transform  filter "
          target="_blank"
          rel="noreferrer"
        >
          <span className="sr-only">{item.name}</span>
          <Image src={item.icon} alt="social-icon" width={40} height={40} />
        </a>
      ))}
    </div>
  );
}
