import 'antd/dist/antd.css'
import Link from 'next/link'
import { Layout, Menu } from 'antd'

const { Header } = Layout;


const Nav = () => {
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
                <Menu.Item key="home">
                    <Link href="/">
                        <a>รายงาน</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="customer">
                    <Link href="/customers">
                        <a>จัดการลูกค้า</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="product">
                    <Link href="/products">
                        <a>จัดการสินค้า</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="order">
                    <Link href="/orders">
                        <a>จัดการออเดอร์</a>
                    </Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
}

export default Nav;
