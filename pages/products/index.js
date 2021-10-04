import { Form, message } from 'antd';
import ManageLayout from '@/comps/layouts/ManageLayout';
import useTranslation from 'next-translate/useTranslation';
import ProductTable from '@/comps/table/ProductTable';
import ProductModal from '@/comps/modals/ProductModal';

import axios from "@/plugins/axios.config";
import React, { useState, useRef } from 'react';

const Product = () => {
    let { t } = useTranslation();
    const tableRef = useRef(null);
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState();
    const [modalType, setModalType] = useState('create');

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
        let url = formType == 'create' ? '/api/product' : `/api/product/${formData.productId}`;
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

    const showEditModal = (dataId) => {
        setModalType('update');
        setLoadingModal(true);
        axios.get(`/api/product/${dataId}`).then(({ data }) => {
            form.setFieldsValue({
                productId: dataId,
                product_name: data.product_name,
                price: data.price,
                qty: data.qty,
                weight: data.weight,
                sku: data.sku,
                cost: data.cost,
                vat: data.vat,
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
        <ManageLayout title={t('product:title')} onSearch={onSearch} onCreate={showCreateModal}>
            <ProductTable ref={tableRef} onEdit={showEditModal} />
            <ProductModal
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
        </ManageLayout >
    )
}

export default Product