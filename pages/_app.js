import '../styles/globals.css'
import 'antd/dist/antd.css'
import MyLayout from '../comps/MyLayout'

import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
axios.defaults.baseURL = publicRuntimeConfig.backendUrl;

function MyApp({ Component, pageProps }) {
  return (
    <MyLayout >
      <Component {...pageProps} />
    </MyLayout>
  )
}

export default MyApp
