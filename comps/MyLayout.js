import styles from '../styles/Layout.module.css'
import Nav from './Nav'
import MyFooter from './MyFooter'

import { Layout, Breadcrumb } from 'antd'

const { Content } = Layout;

const MyLayout = ({ children }) => {
    return (
        <Layout className="layout">
            <Nav />
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.siteLayoutBackground} style={{ padding: 24, minHeight: 380 }}>
                    {children}
                </div>
            </Content>
            <MyFooter />
        </Layout>
    );
}

export default MyLayout;