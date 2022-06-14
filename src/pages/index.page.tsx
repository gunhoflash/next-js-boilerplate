import Link from 'next/link';
import withLayout from '@components/withLayout';

const IndexPage = () => {
  return (
    <>
      <h1>Hello World</h1>
      <p>This is the default index page</p>
      <Link href="/about">Go to about page</Link>
    </>
  );
};

export default withLayout(IndexPage);
