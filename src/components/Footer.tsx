import Link from 'next/link';

const Footer = () => (
  <footer className="mt-auto bg-gray-200">
    <div className="container flex flex-col items-center p-4 mx-auto lg:flex-row">
      <Link href="/">
        <a className="mx-2 my-1 text-gray-500">소개</a>
      </Link>
      <Link href="/">
        <a className="mx-2 my-1 text-gray-500">이용약관</a>
      </Link>
      <Link href="/">
        <a className="mx-2 my-1 text-gray-500">개인정보처리방침</a>
      </Link>
      <Link href="/">
        <a className="mx-2 my-1 text-gray-500">고객센터</a>
      </Link>
      <Link href="https://github.com/gunhoflash">
        <a className="mx-2 my-1 text-gray-500 lg:ml-auto">© gunhoflash</a>
      </Link>
    </div>
  </footer>
);

export default Footer;
