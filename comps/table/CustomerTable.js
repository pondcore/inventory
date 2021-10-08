import { Avatar, Button, Table, Space } from 'antd';
import DeleteModal from '@/comps/modals/DeleteModal';
import useTranslation from 'next-translate/useTranslation';

import axios from '@/plugins/axios.config';
import React, { useState, useEffect, useImperativeHandle } from 'react';

const CustomerTable = ({ onEdit }, ref) => {
    let { t } = useTranslation();
    const [customers, setCustomers] = useState([]);
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
            url: '/api/customer',
            method: 'get',
            type: 'json',
            params
        }).then(({ data }) => {
            let customerList = [];
            data.customers.forEach((cus, index) => {
                cus.addr.forEach((add) => {
                    customerList.push({
                        fullname: `${cus.prefix} ${cus.firstname} ${cus.lastname}`,
                        image: cus.image,
                        key: add._id,
                        ...add
                    })
                })
            });
            setCustomers(customerList);
            setTableProps({
                ...tableProps,
                loading: false,
                pagination: {
                    ...tableProps.pagination,
                    total: data.total,
                }
            });
        });
    }

    useImperativeHandle(ref, () => ({
        fetch() {
            fetch({ pagination: tableProps.pagination })
        }
    }));

    useEffect(() => fetch({ pagination: tableProps.pagination }), []);

    const manageColumns = (text, record) => (
        <Space size="middle">
            <Button onClick={() => { onEdit(record.id, record.key) }}>{t('common:editButton')}</Button>
            <DeleteModal
                deleteUrlId={`/api/customer/${record.key}`}
                buttonText={t('common:deleteButton')}
                handleConfirm={fetch}
                title={t('common:deleteTitle', { text: t('customer:title') })}
                content={t('common:deleteDescription', { text: t('customer:title') })}
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
            title: 'ชื่อ-สกุล',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'ที่อยู่',
            dataIndex: 'description',
            key: 'description',
            width: 'max-content',
        },
        {
            title: 'ตำบล/แขวง',
            dataIndex: 'tambon_name',
            key: 'tambon_name',
        },
        {
            title: 'อำเภอ/เขต',
            dataIndex: 'amphur_name',
            key: 'amphur_name',
        },
        {
            title: 'จังหวัด',
            dataIndex: 'province_name',
            key: 'province_name',
        },
        {
            title: 'รหัสไปรษณีย์',
            dataIndex: 'post_code',
            key: 'post_code',
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
            dataSource={customers}
            columns={columns}
            tableLayout="auto"
            pagination={tableProps.pagination}
            loading={tableProps.loading}
        />
    );
}

export default React.forwardRef(CustomerTable);
