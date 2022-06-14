import Image from 'next/image';
import Link from 'next/link';
import {ReactNode} from 'react';

interface HeaderNavListItemProps {
  href: string;
  children: ReactNode;
}

const HeaderNavListItem = (props: HeaderNavListItemProps) => (
  <li className="px-4 py-2">
    <Link href={props.href}>
      {props.children}
    </Link>
  </li>
);

HeaderNavListItem.displayName = 'HeaderNavListItem';

const GNB = () => (
  <header className="bg-white shadow">
    <div className="container flex items-center px-4 mx-auto">
      <div className="p-3">
        <Link href="/">
          <a className="flex items-center">
            <Image src="/vercel.svg" width="50" height="50" alt="Logo" />
            <h1 className="ml-2">Title</h1>
          </a>
        </Link>
      </div>
      <ul className="flex mx-auto">
        <HeaderNavListItem href="/">항목1</HeaderNavListItem>
        <HeaderNavListItem href="/">항목2</HeaderNavListItem>
        <HeaderNavListItem href="/">항목3</HeaderNavListItem>
        <HeaderNavListItem href="/">항목4</HeaderNavListItem>
      </ul>
    </div>
  </header>
);

export default GNB;
