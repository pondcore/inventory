import { Avatar, Button, Space, Form, message } from 'antd';
import IndexPageLayout from '@/comps/layouts/IndexPageLayout';
import useTranslation from 'next-translate/useTranslation';
import ProductTable from '@/comps/table/ProductTable';
import ProductModal from '@/comps/modals/ProductModal';
import DeleteModal from '@/comps/modals/DeleteModal';

import axios from "@/plugins/axios.config";
import React, { useState, useRef, useEffect } from 'react';

const Product = () => {
    let { t } = useTranslation();
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState();
    const [modalType, setModalType] = useState('create');
    const [products, setProducts] = useState([]);
    const [tableProps, setTableProps] = useState({
        loading: false,
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const fetch = (params = {}) => {
        setTableProps({ ...tableProps, loading: true });
        axios({
            url: '/api/product',
            method: 'get',
            type: 'json',
        }).then(response => {
            setProducts(response.data.reverse());
            setTableProps({
                ...tableProps,
                loading: false,
                pagination: {
                    ...tableProps.pagination,
                    total: response.data.length,
                }
            });
        });
    };
    useEffect(() => fetch({ pagination: tableProps.pagination }), []);

    const manageColumns = (text, record) => (
        <Space size="middle" >
            <Button onClick={() => { showEditModal(record._id) }}>{t('common:editButton')}</Button>
            <DeleteModal
                deleteUrlId={`/api/product/${record._id}`}
                buttonText={t('common:deleteButton')}
                handleConfirm={fetch}
                title={t('common:deleteTitle', { text: t('product:title') })}
                content={t('common:deleteDescription', { text: t('product:title') })}
            />
        </Space>
    );

    const columns = [
        {
            title: 'รูป',
            dataIndex: 'image',
            align: 'center',
            key: 'image',
            render: function avatar(image) {
                return (<Avatar
                    size={64}
                    src={image}
                    alt=""
                />)
            }
        },
        {
            title: 'ชื่อสินค้า',
            dataIndex: 'product_name',
            key: 'name',
        },
        {
            title: 'รหัส SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'ราคา/บาท',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'น้ำหนัก',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'จำนวน',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'จัดการ',
            key: 'action',
            align: 'center',
            render: manageColumns
        },
    ];

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
            fetch();
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
        <IndexPageLayout title={t('product:title')} onSearch={onSearch} onCreate={showCreateModal}>
            <ProductTable tableData={products} columns={columns} />
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
        </IndexPageLayout >
    )
}

export default Product