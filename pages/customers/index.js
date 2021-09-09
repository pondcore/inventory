import { Form, Input } from 'antd';
import ManageLayout from '@/comps/layouts/ManageLayout';
import useTranslation from 'next-translate/useTranslation';
import CustomerTable from '@/comps/CustomerTable';
import CustomerModal from '@/comps/modals/CustomerModal';

import axios from '@/plugins/axios.config';
import React, { useState } from 'react';

export const getStaticProps = async () => {
    const customers = (await axios.get("/api/customer")).data;
    const provinces = (await axios({
        method: 'get',
        url: '/v1/thailand/provinces',
        baseURL: 'https://thaiaddressapi-thaikub.herokuapp.com/'
    })).data;

    return {
        props: { customers, provinces }
    }
}

const Customer = ({ customers, provinces = [] }) => {
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
        <ManageLayout title={t('customer:title')} onSearch={onSearch} onCreate={showCreate}>
            <CustomerTable customers={customers} />
            <CustomerModal form={form} visible={isCreateVisible} onSubmit={handleOk} onClose={handleCancel} provinces={provinces} />
        </ManageLayout>
    </>)
}

export default Customer