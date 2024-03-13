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

  return (
    <>
      <MetaHead {...metaHeadProps} />
      <Header />
      <div className="pt-14">{children}</div>
      <Footer />
    </>
  );
}
