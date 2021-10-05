import { Avatar, Button, Table, Space } from 'antd';
import DeleteModal from '@/comps/modals/DeleteModal';
import useTranslation from 'next-translate/useTranslation';

import axios from '@/plugins/axios.config';
import React, { useState, useEffect, useImperativeHandle } from 'react';

const ProductTable = ({ onEdit }, ref) => {
    let { t } = useTranslation();
    const [orders, setProducts] = useState([]);
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
            url: '/api/order',
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

    // useEffect(() => fetch({ pagination: tableProps.pagination }), []);

    const manageColumns = (text, record) => (
        <Space size="middle">
            <Button onClick={() => { onEdit(record._id) }}>{t('common:editButton')}</Button>
        </Space>
    );

    const coverColumns = (text, record) => (
        <Space size="middle">
            <Button type="primary" onClick={() => { console.log(record.orderId); }}>{t('order:table.printButton')}</Button>
        </Space>
    );

    const columns = [
        {
            title: 'ลำดับ',
            key: 'index',
            render: (text, record) => { orders.indexOf(record) + 1 }
        },
        {
            title: 'เลขออเดอร์',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'ชื่อ-สกุล',
            dataIndex: 'customerFullName',
            key: 'customerFullName',
        },
        {
            title: 'เบอร์โทร',
            dataIndex: 'customerPhone',
            key: 'customerPhone',
        },
        {
            title: 'ราคา',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'วันที่สร้าง',
            dataIndex: 'create_at',
            key: 'create_at',
        },
        {
            title: 'ใบแปะหน้า',
            key: 'printCover',
            align: 'center',
            render: coverColumns
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            key: 'status',
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
            dataSource={orders}
            columns={columns}
        />
    )
}

export default React.forwardRef(ProductTable);
