import { Avatar, Button, Table, Space } from 'antd';
import DeleteModal from '@/comps/modals/DeleteModal';
import useTranslation from 'next-translate/useTranslation';

import axios from '@/plugins/axios.config';
import React, { useState, useEffect, useImperativeHandle } from 'react';

const ProductTable = ({ onEdit }, ref) => {
    let { t } = useTranslation();
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

    useImperativeHandle(ref, () => ({
        fetch() {
            fetch({ pagination: tableProps.pagination })
        }
    }));

    useEffect(() => fetch({ pagination: tableProps.pagination }), []);

    const manageColumns = (text, record) => (
        <Space size="middle">
            <Button onClick={() => { onEdit(record._id) }}>{t('common:editButton')}</Button>
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

    return (
        <Table
            dataSource={products}
            columns={columns}
        />
    )
}

export default React.forwardRef(ProductTable);
