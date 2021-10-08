import { Modal, Row, Col, Table, Avatar, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';

import axios from "@/plugins/axios.config";
import React, { useState, useEffect } from 'react';

const { Text } = Typography;
const SelectProductModal = ({ visible, onClose, orderProducts, setProducts, calculatePrice }) => {
    let { t } = useTranslation();
    const [productList, setProductList] = useState([]);
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
            key: 'product_name',
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
            title: 'คงเหลือ',
            dataIndex: 'qty',
            key: 'qty',
            render: function amount(text) {
                let textColor = (parseInt(text) == 0) ? 'danger' : null;
                return (<Text type={textColor}>{text}</Text>)
            }
        },
    ]

    const rowSelection = {
        onSelect: (record, selected) => {
            let newOrderProduct = (selected) ? [...orderProducts, { ...record, amount: 1 }] :
                orderProducts.filter(item => item._id != record._id);
            calculatePrice(newOrderProduct);
            setProducts(newOrderProduct);
        },
        getCheckboxProps: (record) => ({
            disabled: record.qty == 0,
            // Column configuration not to be checked
            name: record.product_name,
        }),
        hideSelectAll: true
    };

    const [tableProps, setTableProps] = useState({
        loading: false,
        pagination: {
            current: 1,
            pageSize: 4,
        },
    });

    const handleTableChange = (pagination) => {
        fetch({ pagination });
    };


    const fetch = async (params = {}) => {
        setTableProps({ ...tableProps, loading: true });
        return axios({
            method: 'get',
            url: `/api/product`,
            params: {
                ...params.pagination,
            }
        }).then(({ data }) => {
            setProductList(data.products);
            setTableProps({
                ...tableProps,
                loading: false,
                pagination: {
                    ...data.pagination,
                    total: data.total,
                }
            });
        });
    }

    useEffect(() => {
        fetch({ pagination: tableProps.pagination });
    }, []);

    return (<Modal
        centered
        title={t('order:form.productList')}
        visible={visible}
        onCancel={onClose}
        width={860}
        forceRender
        footer={null}
    >
        <Row gutter={16}>
            <Col span={24}>
                <Table
                    rowSelection={{
                        ...rowSelection,
                    }}
                    dataSource={productList}
                    columns={columns}
                    pagination={tableProps.pagination}
                    loading={tableProps.loading}
                    onChange={handleTableChange}
                    tableLayout="auto"
                    rowKey="_id"
                />
            </Col>
        </Row>
    </Modal >);
}

export default SelectProductModal;