import { Form, Button, Row, Col, Input } from 'antd';
import React, { useState } from 'react';
import CustomerTable from 'comps/CustomerTable';
import CustomerModal from 'comps/CustomerModal';

const { Search } = Input;
const onSearch = value => console.log(value);

export const getStaticProps = async () => {
    const res = await fetch("http://localhost:5000/api/customer");
    const data = await res.json();

    return {
        props: { customers: data }
    }
}

const Customer = ({ customers }) => {
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [form] = Form.useForm();

    const showCreate = () => {
        setIsCreateVisible(true);
    };

    const handleOk = () => {
        setIsCreateVisible(false);
    };

    const handleCancel = () => {
        setIsCreateVisible(false);
    };

    return (
        <div>
            <Row>
                <Col span="12">
                    <Search size="large" placeholder="ค้นหาลูกค้า" allowClear onSearch={onSearch} style={{ width: 300 }} />
                </Col>
                <Col span="12" style={{ textAlign: 'right' }}>
                    <Button size={"large"} type="primary" onClick={showCreate}>
                        Open Modal
                    </Button>
                    <CustomerModal form={form} visible={isCreateVisible} onSubmit={handleOk} onClose={handleCancel} />
                </Col>
            </Row>
            <div className="page-header"><h1>จัดการลูกค้า</h1></div>
            <CustomerTable customers={customers} />
        </div>
    )
}

export default Customer