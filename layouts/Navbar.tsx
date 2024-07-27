import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import Socials from 'components/Socials';
import siteData from 'siteData';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [learnVisible, setLearnVisible] = useState(false);
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const nav = [
      {
        name: ' الرئيسية',
        href: '/',
        current: true,
        visable: true,
        svgNamespace: 'http://www.w3.org/2000/svg',
        svgPath:
          'm19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 1 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z',
        svgProps: {}
      },
      {
        name: ' 500 لعبه',
        href: '/book',
        current: false,
        svgNamespace: 'http://www.w3.org/2000/svg',
        svgPath:
          'M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z',
        svgProps: {}
      },
      {
        name: 'شاركنا العاب',
        href: '/addGames',
        current: false,
        svgNamespace: 'http://www.w3.org/2000/svg',
        svgPath:
          'M512 936.916C277.327 936.916 87.084 746.672 87.084 512S277.327 87.083 512 87.083c234.677 0 424.917 190.244 424.917 424.916S746.677 936.916 512 936.916zm212.458-467.412H554.492V299.546h-84.984v169.958H299.542v84.992h169.966v169.966h84.984V554.496h169.966v-84.992z',
        svgProps: {}
      },
      {
        name: token !== null ? 'حسابى' : 'سجل دخول',
        current: false,
        svgNamespace: 'http://www.w3.org/2000/svg',
        svgPath: 'M10 10a4 4 0 110-8 4 4 0 010 8zM2 20a10 10 0 0116-8 10 10 0 01-16 8z',
        svgProps: {},
        href: token !== null ? '' : '/login'
      }
    ];

    setNavigation(nav);
  }, []);

  const toggleLearnVisibility = () => {
    setLearnVisible(!learnVisible);
  };

  const handleClick = e => {
    e.preventDefault();
    toggleLearnVisibility();
  };

  const renderButton = item => (
    <button
      type="button"
      onClick={item.name === 'حسابى' ? handleClick : () => setLearnVisible(false)}
      className="inline-flex flex-col items-center justify-center"
    >
      <svg
        className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
        aria-hidden="true"
        xmlns={item.svgNamespace}
        fill="currentColor"
        viewBox="0 0 20 20"
        {...item.svgProps}
      >
        <path d={item.svgPath} />
      </svg>
      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
        {item.name}
      </span>
    </button>
  );

  return (
    <Disclosure as="nav" className="bg-gray-000">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/" passHref>
                    <div className="sm:text-lg md:text-xl font-bold cursor-pointer">
                      {siteData?.headerTitle}
                    </div>
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="rtl-grid hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(
                      item =>
                        item.visable && (
                          <Link
                            passHref
                            key={item.name}
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            <div
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-900 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                            >
                              {item.name}
                            </div>
                          </Link>
                        )
                    )}
                  </div>
                </div>
                <Socials />
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            {learnVisible && (
              <div className="absolute bottom-16 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div className="grid h-full grid-cols-2 mx-auto font-medium">
                  <button
                    className="w-full"
                    onClick={() => localStorage.removeItem('token')}
                  >
                    <Link
                      className=" w-full h-full inline-flex flex-col items-center justify-center px-2 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
                      href="/"
                      passHref
                    >
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                        تسجيل خروج
                      </span>
                    </Link>
                  </button>

                  <Link
                    className="inline-flex flex-col items-center justify-center px-2 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
                    passHref
                    href="/someOtherLink"
                  >
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                      Navigation Link
                    </span>
                  </Link>
                </div>
              </div>
            )}
            <div className={`grid h-full grid-cols-4 mx-auto font-medium`}>
              {navigation.map((item, index) => (
                <>
                  {item.href.length !== 0 ? (
                    <Link
                      key={index}
                      className="inline-flex flex-col items-center justify-center px-2 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
                      passHref
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {renderButton(item)}
                    </Link>
                  ) : (
                    renderButton(item)
                  )}
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
