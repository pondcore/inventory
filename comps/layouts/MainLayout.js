import styles from '@/styles/Layout.module.css'
import Nav from '../Nav'
import MyFooter from '../MyFooter'

import { Layout, Breadcrumb } from 'antd'
import { useRouter } from 'next/router';

const { Content } = Layout;

const MainLayout = ({ children }) => {
    const router = useRouter()
    return (
        <Layout className="layout">
            <Nav />
            <Content className={"site-layout " + styles['content-layout']} style={{ marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    {router.route == "/" ? <Breadcrumb.Item>home</Breadcrumb.Item> : router.route.split("/").map((route) => {
                        if (route != null) {
                            return <Breadcrumb.Item>{route}</Breadcrumb.Item>
                        }
                    })}
                </Breadcrumb>
                <div className={styles['site-layout-background']}>
                    {children}
                </div>
            </Content>
            <MyFooter />
        </Layout>
    );
}

export default MainLayout;