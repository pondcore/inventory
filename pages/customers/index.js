import { Form, Button, Row, Col, Input } from 'antd';
import ManageLayout from '@/comps/layouts/ManageLayout';
import useTranslation from 'next-translate/useTranslation';
import CustomerTable from '@/comps/CustomerTable';
import CustomerModal from '@/comps/modals/CustomerModal';
import UploadBlock from '@/comps/forms/UploadBlock';

import axios from '@/plugins/axios.config';
import React, { useState } from 'react';
const { Search } = Input;

export const getServerSideProps = async () => {
    const req = await axios.get("/api/customer");
    const customers = req.data;

    return {
        props: { customers }
    }
}

const Customer = ({ customers }) => {
    let { t } = useTranslation();
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [form] = Form.useForm();

    const onSearch = value => console.log(value);
    const showCreate = () => {
        setIsCreateVisible(true);
    };

    const handleOk = () => {
        setIsCreateVisible(false);
    };

    const handleCancel = () => {
        setIsCreateVisible(false);
    };

    return (<>
        {/* <UploadBlock></UploadBlock> */}
        <ManageLayout title={t('customer:title')} onSearch={onSearch} onCreate={showCreate}>
            <CustomerTable customers={customers} />
            <CustomerModal form={form} visible={isCreateVisible} onSubmit={handleOk} onClose={handleCancel} />
        </ManageLayout>
    </>)
}

export default Customer