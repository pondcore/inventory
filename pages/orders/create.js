import { Row, Col, Form, Input, Radio, Spin, InputNumber, Card, Typography, Button, Avatar, Table, Space, message } from 'antd';
import ManagePageLayout from '@/comps/layouts/ManagePageLayout';
import useTranslation from 'next-translate/useTranslation';
import AutocompleteInput from '@/comps/forms/AutocompleteInput'
import SelectProductModal from '@/comps/modals/SelectProductModal'

import React, { useState, useEffect } from 'react';
import axios from '@/plugins/axios.config';
import router from 'next/router';

const { Title } = Typography;
const { TextArea } = Input;

const CreateOrder = ({ setBreadcrumb }) => {
    let { t } = useTranslation();
    const [form] = Form.useForm();
    const [productList, setProductList] = useState([]);
    const [orderTotalPrice, setOrderTotalPrice] = useState(0);
    const [visibleProductModal, setVisibleProductModal] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const amountChange = (recordId, value) => {
        let temp = [];
        productList.forEach(item => {
            temp.push({ ...item })
        })
        temp.forEach((prod, index) => {
            if (prod._id == recordId) {
                temp[index].amount = parseInt(value);
            }
        })
        calculateOrderPrice(temp);
        setProductList(temp);
    }

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
            title: 'น้ำหนัก',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'จำนวน',
            dataIndex: 'amount',
            width: '10%',
            key: 'amount',
            render: function amountInput(text, record) {
                return (<InputNumber min={1} max={record.qty} value={record.amount} onChange={(value) => amountChange(record._id, value)} />)
            }
        },
    ];

    useEffect(() => {
        setBreadcrumb([{
            path: '/orders',
            name: t('order:title')
        }, {
            path: '/orders/create',
            name: t('common:createTitle', { text: t('order:title') })
        }])
    }, [])

    const [customer, setCustomer] = useState([]);
    const [loadCustomerInfo, setLoadCustomerInfo] = useState(false);
    const onSelectCustomer = (newCustomer) => {
        setLoadCustomerInfo(true);
        setCustomer(newCustomer);
        axios({
            url: `/api/customer/${newCustomer.value}`,
            method: 'get',
            type: 'json',
        }).then(({ data }) => {
            form.setFieldsValue({
                customerId: data._id,
                phone: data.phone,
                addrId: data.addr[0]._id,
                address: data.addr[0].description,
                ...data.addr[0]
            })
            setLoadCustomerInfo(false);
        });
    }
    const fetchCustomerList = async (name) => {
        return axios({
            method: 'get',
            url: `/api/customer`,
            params: {
                q: name,
                field: 'prefix firstname lastname',
                limit: 5
            }
        }).then(({ data }) =>
            data.customers.map((cus) => ({
                label: `${cus.firstname} ${cus.lastname}`,
                value: cus._id,
            })),
        );
    }

    const calculateOrderPrice = (newOrderProduct = undefined) => {
        let currProduct = newOrderProduct === undefined ? productList : newOrderProduct;
        let productSum = currProduct.reduce((acc, cur) => { return acc + (parseFloat(cur.price) * parseInt(cur.amount)) }, 0);
        let { shippingCost, discount } = form.getFieldsValue(['shippingCost', 'discount'])
        setOrderTotalPrice(productSum + parseFloat(shippingCost || 0) - parseFloat(discount || 0));
    }

    const onSubmitOrder = async () => {
        setLoadingSubmit(true);
        let formData = form.getFieldsValue();
        console.log(formData);
        formData['totalCost'] = orderTotalPrice - parseFloat(formData.discount || 0);
        formData['totalWeight'] = productList.reduce((acc, cur) => { return acc + (parseFloat(cur.weight) * parseInt(cur.amount)) }, 0);
        formData['totalPrice'] = orderTotalPrice;
        formData['products'] = productList.map(prod => {
            return { id: prod._id, amount: prod.amount }
        })
        axios({
            method: 'post',
            url: '/api/order',
            data: formData,
        }).then(({ data }) => {
            setLoadingSubmit(false);
            if (data.success) {
                router.push('/orders')
            }
        }).catch(err => {
            let errorMessage = typeof err.response !== "undefined" ? err.response.data.message : err.message;
            message.error(errorMessage);
            setLoadingSubmit(false);
        });
    }

    return (
        <ManagePageLayout title={t('common:createTitle', { text: t('order:title') })} backRoute="/orders">
            <Card>
                <Form
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    layout="vertical"
                    form={form}
                >
                    <Title level={3}>{t('order:form.customerInfo')}</Title>
                    <div style={{ marginLeft: '2rem' }}>
                        <Spin tip="Loading..." spinning={loadCustomerInfo}>
                            <Row gutter={16}>
                                <Col xs={24} md={16}>
                                    <Form.Item
                                        name="customerName"
                                        label={t('order:form.customerName')}
                                        rules={[
                                            {
                                                required: true,
                                                message: t('validate:required', { text: t('order:form.customerName') })
                                            }
                                        ]}
                                    >
                                        <AutocompleteInput
                                            value={customer}
                                            onChange={onSelectCustomer}
                                            fetchOptions={fetchCustomerList}
                                            placeholder="ชื่อ สกุล"
                                        />
                                    </Form.Item>
                                    <Form.Item name="customerId" noStyle>
                                        <Input type="hidden" />
                                    </Form.Item>
                                    <Form.Item name="addrId" noStyle>
                                        <Input type="hidden" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        name="phone"
                                        label={t('order:form.customerPhone')}
                                        rules={[
                                            {
                                                required: true,
                                                message: t('validate:required', { text: t('order:form.customerPhone') })
                                            },
                                            {
                                                pattern: new RegExp(/^[0-9]*$/g),
                                                message: t('validate:number', { text: t('order:form.customerPhone') })

                                            }
                                        ]}
                                    >
                                        <Input maxLength={10} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        name="address"
                                        label={t('customer:form.address')}
                                    >
                                        <TextArea
                                            disabled
                                            autoSize={{ minRows: 3, maxRows: 6 }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} md={12} xl={6}>
                                    <Form.Item
                                        name="province_name"
                                        label={t('order:form.customerProvince')}
                                        rules={[
                                            {
                                                required: true,
                                                message: t('validate:required', { text: t('order:form.customerProvince') })
                                            }
                                        ]}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12} xl={6}>
                                    <Form.Item
                                        name="amphur_name"
                                        label={t('order:form.customerDistrict')}
                                        rules={[
                                            {
                                                required: true,
                                                message: t('validate:required', { text: t('order:form.customerDistrict') })
                                            }
                                        ]}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12} xl={6}>
                                    <Form.Item
                                        name="tambon_name"
                                        label={t('order:form.customerSubdistrict')}
                                        rules={[
                                            {
                                                required: true,
                                                message: t('validate:required', { text: t('order:form.customerSubdistrict') })
                                            }
                                        ]}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12} xl={6}>
                                    <Form.Item
                                        name="post_code"
                                        label={t('order:form.customerZipCode')}
                                        rules={[
                                            {
                                                required: true,
                                                message: t('validate:required', { text: t('order:form.customerZipCode') })
                                            },
                                            {
                                                pattern: new RegExp(/^[0-9]*$/g),
                                                message: t('validate:number', { text: t('order:form.customerZipCode') })

                                            }
                                        ]}
                                    >
                                        <Input disabled maxLength={5} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Spin>
                    </div>
                    <Row style={{ marginTop: '2rem' }} justify="space-between">
                        <Col xs={12} md={16}>
                            <Title level={3}>{t('order:form.productList')}</Title>
                        </Col>
                        <Col xs={12} md={8} style={{ textAlign: 'right' }}>
                            <Button type="primary" size="large" onClick={() => setVisibleProductModal(true)} >{t('order:form.selectProduct')}</Button>
                        </Col>
                    </Row>
                    <div style={{ marginLeft: '2rem' }}>
                        <Row style={{ margin: "0.8rem 0" }}>
                            <Col span={24}>
                                <Table
                                    bordered
                                    rowKey="_id"
                                    dataSource={productList}
                                    columns={columns}
                                    tableLayout="auto"
                                />
                            </Col>
                        </Row>
                        <Row gutter={16} justify="end">
                            <Col xs={24} sm={8} md={6}>
                                <Form.Item
                                    name="shippingCost"
                                    label={t('order:form.shippingCost')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('order:form.shippingCost') })
                                        }
                                    ]}
                                    initialValue="0"
                                >
                                    <InputNumber min={0} style={{ width: "100%" }} onChange={(_) => calculateOrderPrice()} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={8} md={6}>
                                <Form.Item
                                    name="discount"
                                    label={t('order:form.discount')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('order:form.discount') })
                                        }
                                    ]}
                                    initialValue="0"
                                >
                                    <InputNumber min={0} style={{ width: "100%" }} onChange={(_) => calculateOrderPrice()} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} justify="end">
                            <Col xs={24} sm={8} md={6} style={{ display: 'flex', justifyContent: 'right' }}>
                                <Form.Item
                                    name="isPaid"
                                    initialValue="1"
                                >
                                    <Radio.Group>
                                        <Space direction="vertical">
                                            <Radio value="1" checked>{t('order:form.paymentComplete')}</Radio>
                                            <Radio value="2">{t('order:form.paymentPending')}</Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={8} md={6} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <Title level={4}>{t('order:form.totalPrice')}</Title>
                                </div>
                                <div>
                                    <Title level={4} type="success">฿{orderTotalPrice}</Title>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Row justify="end">
                        <Col>
                            <Button type="primary" size="large" onClick={onSubmitOrder} loading={loadingSubmit}>{t('common:form.submit')}</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
            <SelectProductModal
                visible={visibleProductModal}
                orderProducts={productList}
                calculatePrice={calculateOrderPrice}
                setProducts={setProductList}
                onClose={() => setVisibleProductModal(false)}
            />
        </ManagePageLayout>
    )
}

export default CreateOrder