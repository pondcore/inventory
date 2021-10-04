import { Form, Input, message } from 'antd';
import ManageLayout from '@/comps/layouts/ManageLayout';
import useTranslation from 'next-translate/useTranslation';
import CustomerTable from '@/comps/CustomerTable';
import CustomerModal from '@/comps/modals/CustomerModal';

import axios from '@/plugins/axios.config';
import React, { useState, useRef } from 'react';

const Customer = () => {
    let { t } = useTranslation();
    const tableRef = useRef(null);
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState();

    const onSearch = value => console.log(value);
    const showCreate = async () => {
        setIsCreateVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        let formData = {
            ...form.getFieldsValue(),
            image: imageUrl,
        };
        console.log(formData);
        axios.post('/api/customer', formData).then((response) => {
            setIsCreateVisible(false);
            setConfirmLoading(false);
            form.resetFields();
            setImageUrl(null);
            tableRef.current.fetch();
        }).catch(err => {
            let errorMessage = typeof err.response !== "undefined" ? err.response.data.message : err.message;
            setIsCreateVisible(false);
            setConfirmLoading(false);
            message.error(errorMessage);
        })
    };

    const handleClose = () => {
        setIsCreateVisible(false);
        setConfirmLoading(false);
        form.resetFields();
        setImageUrl(null);
    };

    const onEditCustomer = () => {
        setIsCreateVisible(true);
    }

    const onDeleteCustomer = () => {
        setIsCreateVisible(true);
    }

    return (
        <ManageLayout title={t('customer:title')} onSearch={onSearch} onCreate={showCreate}>
            <CustomerTable ref={tableRef} onEdit={onEditCustomer} onDelete={onDeleteCustomer} />
            <CustomerModal
                form={form}
                visible={isCreateVisible}
                onSubmit={handleOk}
                onClose={handleClose}
                confirmLoading={confirmLoading}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
            />
        </ManageLayout >
    )
}

export default Customer