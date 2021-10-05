import { Row, Col, Form, Input, Select, Spin, InputNumber, Card, Typography, Button, Avatar } from 'antd';
import ManagePageLayout from '@/comps/layouts/ManagePageLayout';
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation';
import ProductTable from '@/comps/table/ProductTable';

const { Title } = Typography;
const { TextArea } = Input;
import React, { useState } from 'react';

const CreateOrder = () => {
    let { t } = useTranslation();
    const [form] = Form.useForm();
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
    ];

    return (
        <ManagePageLayout title={t('common:createTitle', { text: t('order:title') })} backRoute="/orders">
            <Head>
                <title>{t('common:page_title', { text: t('order:title') })}</title>
            </Head>
            <Card>
                <Form
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    layout="vertical"
                    size="small"
                    form={form}
                >
                    <Title level={3}>{t('order:form.customerInfo')}</Title>
                    <div style={{ marginLeft: '2rem' }}>
                        <Row gutter={16}>
                            <Col span={16}>
                                <Form.Item
                                    name="customerId"
                                    noStyle
                                >
                                    <Input type="hidden" />
                                </Form.Item>
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
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="phone"
                                    label={t('order:form.customerPhone')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('order:form.customerName') })
                                        },
                                        {
                                            pattern: new RegExp(/^[0-9]*$/g),
                                            message: t('validate:number', { text: t('order:form.customerName') })

                                        }
                                    ]}
                                >
                                    <Input disabled maxLength={10} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
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
                            <Col span={6}>
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
                            <Col span={6}>
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
                            <Col span={6}>
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
                            <Col span={6}>
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
                    </div>
                    <Title level={3}>{t('order:form.productList')}</Title>
                    <div style={{ marginLeft: '2rem' }}>
                        <Row gutter={16} align="middle">
                            <Form.Item name="productId" noStyle><Input type="hidden" /></Form.Item>
                            <Col span={20}>
                                <Form.Item
                                    name="productName"
                                    label={t('order:form.productName')}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={4} >
                                <Button type="primary" size="large" style={{ width: "100%" }}>{t('order:form.addProduct')}</Button>
                            </Col>
                        </Row>
                        <ProductTable tableData={productList} columns={columns} />
                        <Row gutter={16} justify="end">
                            <Col span={6}>
                                <Form.Item
                                    name="shippingCost"
                                    label={t('order:form.shippingCost')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('order:form.shippingCost') })
                                        }
                                    ]}
                                >
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="discount"
                                    label={t('order:form.discount')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('order:form.discount') })
                                        }
                                    ]}
                                >
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} justify="end">
                            <Col span={6}>
                                <Form.Item
                                    name="totalPrice"
                                    label={t('order:form.totalPrice')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('order:form.totalPrice') })
                                        }
                                    ]}
                                >
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <Row justify="end">
                        <Col>
                            <Button type="primary" size="large">{t('common:form.submit')}</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </ManagePageLayout>
    )
}

export default CreateOrder