import Head from 'next/head';
import {FC} from 'react';

export interface WithHeadOptions {
  title?: string;
  description?: string;
  Tag?: FC;
}

const DEFAULT_TITLE = 'title';
const DEFAULT_DESCRIPTION = 'description';

// eslint-disable-next-line react/display-name
const withHead = <T = unknown>(Component: FC<T>, options?: WithHeadOptions) => (componentProps: T) => (
  <>
    <Head>
      <title>{options?.title || DEFAULT_TITLE}</title>
      <meta name="description" content={options?.title || DEFAULT_TITLE} />
      <meta property="og:title" content={options?.title || DEFAULT_TITLE} />
      <meta property="og:description" content={options?.description || DEFAULT_DESCRIPTION} />
      {options?.Tag && <options.Tag />}
    </Head>
    <Component {...componentProps} />
  </>
);

export default withHead;
