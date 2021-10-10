import { Form, message } from 'antd';
import IndexPageLayout from '@/comps/layouts/IndexPageLayout';
import useTranslation from 'next-translate/useTranslation';
import CustomerTable from '@/comps/table/CustomerTable';
import CustomerModal from '@/comps/modals/CustomerModal';

import axios from '@/plugins/axios.config';
import React, { useState, useRef, useEffect } from 'react';

const Customer = ({ setBreadcrumb }) => {
    let { t } = useTranslation();
    const tableRef = useRef(null);
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState();
    const [modalType, setModalType] = useState('create');

    useEffect(() => {
        setBreadcrumb([{
            path: '/customers',
            name: t('customer:title')
        }])
    }, [])

    const onSearch = value => console.log(value);
    const showCreateModal = async () => {
        setModalType('create');
        setIsCreateVisible(true);
    };

    const handleSubmit = (formType) => {
        setConfirmLoading(true);
        setLoadingModal(true)
        let formData = {
            ...form.getFieldsValue(),
            image: imageUrl,
        }
        let url = formType == 'create' ? '/api/customer' : `/api/customer/${formData.addrId}`;
        axios({
            method: formType == 'create' ? 'POST' : 'PUT',
            url,
            data: formData
        }).then((response) => {
            setIsCreateVisible(false);
            setConfirmLoading(false);
            setLoadingModal(false);
            form.resetFields();
            setImageUrl(null);
            tableRef.current.fetch();
        }).catch(err => {
            let errorMessage = typeof err.response !== "undefined" ? err.response.data.message : err.message;
            setConfirmLoading(false);
            setLoadingModal(false);
            message.error(errorMessage);
        })
    };

    const handleClose = () => {
        setIsCreateVisible(false);
        setConfirmLoading(false);
        setLoadingModal(false);
        form.resetFields();
        setImageUrl(null);
    };

    const showEditModal = (dataId, addrKey) => {
        setModalType('update');
        setLoadingModal(true);
        axios.get(`/api/customer/${addrKey}`).then(({ data }) => {
            const addrData = data.addr.find(item => item._id === addrKey)
            form.setFieldsValue({
                id: dataId,
                addrId: addrKey,
                prefix: data.prefix,
                firstname: data.firstname,
                lastname: data.lastname,
                phone: data.phone,
                province: addrData.province_name,
                district: addrData.amphur_name,
                subdistrict: addrData.tambon_name,
                postcode: addrData.post_code,
                address: addrData.description
            });
            setImageUrl(data.image);
            setLoadingModal(false);
        }).catch(err => {
            let errorMessage = typeof err.response !== "undefined" ? err.response.data.message : err.message;
            setConfirmLoading(false);
            message.error(errorMessage);
        })

        setIsCreateVisible(true);
    }

    return (
        <IndexPageLayout title={t('customer:title')} onSearch={onSearch} onCreate={showCreateModal}>
            <CustomerTable ref={tableRef} onEdit={showEditModal} />
            <CustomerModal
                form={form}
                modalType={modalType}
                visible={isCreateVisible}
                onSubmit={handleSubmit}
                onClose={handleClose}
                loadingModal={loadingModal}
                confirmLoading={confirmLoading}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
            />
        </IndexPageLayout >
    )
}

export default Customer