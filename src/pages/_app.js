import PocketBase from 'pocketbase';
import '@/styles/globals.css';
import { useEffect, useState } from 'react';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function App({ Component, pageProps }) {
  const [pocketBase, setPocketBase] = useState(null);

  useEffect(() => {
    pb.authStore.loadFromCookie(document.cookie);
    setPocketBase(pb);
  }, []);

  return <Component pb={pocketBase} {...pageProps} />;
}
