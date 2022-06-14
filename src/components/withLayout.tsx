import React, {FC, ReactNode} from 'react';
import Footer from './Footer';
import GNB from './GNB';
import withHead, {WithHeadOptions} from './withHead';

interface LayoutProps {
  children?: ReactNode;
  headOptions?: WithHeadOptions;
  noGNB?: boolean;
  noFooter?: boolean;
}

const LayoutBody: FC<LayoutProps> = props => (
  <>
    {props.noGNB || <GNB />}
    <div className="flex-1 w-full p-4 mx-auto md:container">
      {props.children}
    </div>
    {props.noFooter || <Footer />}
  </>
);

const Layout = (props: LayoutProps) => withHead(LayoutBody, props.headOptions)(props);

// eslint-disable-next-line react/display-name
const withLayout = <T = unknown>(Component: FC<T>, layoutProps?: LayoutProps) => (props: T) => (
  <Layout {...layoutProps}>
    <Component {...props} />
  </Layout>
);

export default withLayout;
