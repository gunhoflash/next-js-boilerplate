import type {AppProps} from 'next/app';
import '@styles/dist/global.css';

const App = ({Component, pageProps}: AppProps) => (
  <div className="flex flex-col w-full min-h-screen overflow-x-hidden">
    <Component {...pageProps} />
  </div>
);

export default App;
