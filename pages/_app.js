import '../styles/globals.css'
import 'antd/dist/antd.css'
import MainLayout from '../comps/layouts/MainLayout'
import React, { useState, useEffect } from 'react';

function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  // The following effect will be ignored on server, 
  // but run on the browser to set the flag true
  useEffect(() => setIsClient(true), []);
  return isClient
}

function MyApp({ Component, pageProps }) {
  const isClient = useIsClient();
  return (
    <>{isClient &&
      <MainLayout >
        <Component {...pageProps} />
      </MainLayout>
    }</>
  )
}

export default MyApp;
