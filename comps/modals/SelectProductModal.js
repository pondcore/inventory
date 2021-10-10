import { Modal, Row, Col, Avatar, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import MainAjaxTable from '@/comps/table/MainAjaxTable';

import axios from "@/plugins/axios.config";
import React, { useState, useImperativeHandle } from 'react';

const { Text } = Typography;
const SelectProductModal = ({ visible, onClose, orderProducts, setProducts, calculatePrice }, ref) => {
    let { t } = useTranslation();
    const [productList, setProductList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
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

    useImperativeHandle(ref, () => ({
        setSelectedProductKeys: setSelectedRowKeys
    }), [])

    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        onSelect: (record, selected) => {
            let newOrderProduct = (selected) ? [...orderProducts, { ...record, amount: 1 }] :
                orderProducts.filter(item => item._id != record._id);
            calculatePrice(newOrderProduct);
            setProducts(newOrderProduct);
            setSelectedRowKeys()
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
                <MainAjaxTable
                    rowSelection={{
                        ...rowSelection,
                    }}
                    fetchData={fetch}
                    dataSource={productList}
                    columns={columns}
                    tablePagination={tableProps.pagination}
                    loading={tableProps.loading}
                />
            </Col>
        </Row>
    </Modal >);
}

export default React.forwardRef(SelectProductModal);