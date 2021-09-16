import { Form, Input } from 'antd';
import ManageLayout from '@/comps/layouts/ManageLayout';
import useTranslation from 'next-translate/useTranslation';
import CustomerTable from '@/comps/CustomerTable';
import CustomerModal from '@/comps/modals/CustomerModal';

import axios from '@/plugins/axios.config';
import React, { useState, useEffect } from 'react';
import addressApi from '@/helpers/formApi';

export const getStaticProps = async () => {
    const customers = await axios.get("/api/customer");

    return {
        props: { customers: customers.data }
    }
}

const Customer = ({ customers }) => {
    let { t } = useTranslation();
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [provinces, setProvinces] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        async function fetchProvince() {
            const provinceResponse = await addressApi.getProvince();
            setProvinces(provinceResponse.data);
        }
        fetchProvince()
    }, [])

    const onSearch = value => console.log(value);
    const showCreate = async () => {
        setIsCreateVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        console.log(form.getFieldsValue());
        setTimeout(() => {
            setConfirmLoading(false);
            setIsCreateVisible(false);
            form.resetFields();
        }, 1000);
    };

    const handleCancel = () => {
        setIsCreateVisible(false);
    };

    return (<>
        <ManageLayout title={t('customer:title')} onSearch={onSearch} onCreate={showCreate}>
            <CustomerTable customers={customers} />
            <CustomerModal form={form} visible={isCreateVisible} confirmLoading={confirmLoading} onSubmit={handleOk} onClose={handleCancel} provinces={provinces.data} />
        </ManageLayout>
    </>)
}

export default Customer