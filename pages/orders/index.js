
import { Space, Button, Table, Avatar } from 'antd';
import IndexPageLayout from '@/comps/layouts/IndexPageLayout';
import useTranslation from 'next-translate/useTranslation';
import MainAjaxTable from '@/comps/table/MainAjaxTable';

import axios from "@/plugins/axios.config";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

const Order = ({ setBreadcrumb }) => {
    let { t } = useTranslation();
    const router = useRouter()
    const [orders, setOrders] = useState([]);
    const [tableProps, setTableProps] = useState({
        loading: false,
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const manageColumns = (text, record) => (
        <Space size="middle">
            <Button onClick={() => { openEdit(record._id) }}>{t('common:editButton')}</Button>
        </Space>
    );

    const coverColumns = (text, record) => (
        <Space size="middle">
            <Button type="primary" onClick={() => { console.log(record._id); }}>{t('order:table.printButton')}</Button>
        </Space>
    );

    const columns = [
        {
            title: 'เลขออเดอร์',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'ชื่อ-สกุล',
            dataIndex: 'customer_id',
            key: '_id',
            render: function fullname(text) {
                return `${text.prefix} ${text.firstname} ${text.lastname}`
            }
        },
        {
            title: 'เบอร์โทร',
            dataIndex: 'customer_id',
            key: '_id',
            render: function phone(text) {
                return text.phone
            }
        },
        {
            title: 'ราคา',
            dataIndex: 'total_price',
            key: 'total_price',
        },
        {
            title: 'วันที่สร้าง',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => (new Date(text)).toLocaleDateString("th", { year: 'numeric', month: 'long', day: 'numeric' })
        },
        {
            title: 'ใบแปะหน้า',
            key: 'printCover',
            align: 'center',
            render: coverColumns
        },
        {
            title: 'สถานะ',
            dataIndex: 'payment_status',
            key: 'payment_status',
            render: (text) => (text === 'paid') ? 'ชำระเงินแล้ว' : 'รอการชำระ'
        },
        {
            title: 'จัดการ',
            width: '10%',
            key: 'action',
            align: 'center',
            render: manageColumns
        },
    ];

    const productTableRender = (record) => (
        <Table
            pagination={false}
            bordered
            dataSource={record.products}
            columns={[
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
                }, {
                    title: 'ชื่อสินค้า',
                    dataIndex: 'product_name',
                    key: 'product_name',
                }, {
                    title: 'รหัส SKU',
                    dataIndex: 'sku',
                    key: 'sku',
                }, {
                    title: 'ราคา/บาท',
                    dataIndex: 'price',
                    key: 'price',
                }, {
                    title: 'น้ำหนัก',
                    dataIndex: 'weight',
                    key: 'weight',
                }, {
                    title: 'จำนวน',
                    dataIndex: 'amount',
                    key: 'amount',
                }
            ]}
        />
    );

    const fetch = (params = {}) => {
        setTableProps({ ...tableProps, loading: true });
        axios({
            url: '/api/order',
            method: 'get',
            params: {
                ...params.pagination,
            }
        }).then(({ data }) => {
            let tempOrder = data.orders;
            tempOrder.forEach((item, index) => {
                item.products.forEach((prod, inx) => {
                    tempOrder[index].products[inx] = {
                        amount: prod.amount,
                        ...prod.id
                    }
                })
            });
            setOrders(tempOrder);
            setTableProps({
                loading: false,
                pagination: {
                    ...data.pagination,
                    total: data.total,
                }
            });
        });
    };

    useEffect(() => {
        setBreadcrumb([{
            path: '/orders',
            name: t('order:title')
        }])
    }, [])

    const onSearch = value => console.log(value);
    const openCreate = async () => {
        router.push('/orders/create')

    };
    const openEdit = async (dataId) => {
        router.push(`/orders/${dataId}/edit`)
    };
    return (
        <IndexPageLayout title={t('order:title')} onSearch={onSearch} onCreate={openCreate}>
            <MainAjaxTable
                fetchData={fetch}
                dataSource={orders}
                columns={columns}
                tablePagination={tableProps.pagination}
                loading={tableProps.loading}
                expandable={{
                    expandedRowRender: productTableRender,
                    rowExpandable: record => record.products != null && record.products.length > 0,
                }}

            />
        </IndexPageLayout >
    )
}

export default Order