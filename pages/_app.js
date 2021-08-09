import '../styles/globals.css'
import 'antd/dist/antd.css'
import MyLayout from '../comps/MyLayout'

import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

function MyApp({ Component, pageProps }) {
  return (
    <MyLayout >
      <Component {...pageProps} />
    </MyLayout>
  )
}

export default MyApp
