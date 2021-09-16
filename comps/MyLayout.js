import styles from '../styles/Layout.module.css'
import Nav from './Nav'
import MyFooter from './MyFooter'

import { Layout, Breadcrumb } from 'antd'

const { Content } = Layout;

const MyLayout = ({ children }) => {
    return (
        <Layout className="layout">
            <Nav />
            <Content className={"site-layout " + styles['content-layout']} style={{ marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles['site-layout-background']}>
                    {children}
                </div>
            </Content>
            <MyFooter />
        </Layout>
    );
}

export default MyLayout;