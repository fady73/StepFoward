import Footer from './Footer';
import Header from './Navbar';
import { MetaHead } from './MetaHead';

export function Layout(props) {
  const { children, date, imageUrl, title, description, ogUrl, blog } = props;

  const metaHeadProps = {
    date,
    imageUrl,
    description,
    ogUrl,
    title
  };
  console.log('metaHeadProps', metaHeadProps);

  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}
