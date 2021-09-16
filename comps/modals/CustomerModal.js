import { Modal, Row, Col, Form, Input, Select, message } from 'antd';
import UploadBlock from '@/comps/forms/UploadBlock';
import useTranslation from 'next-translate/useTranslation';
import addressApi from '@/helpers/formApi';

import React, { useState } from 'react';

const { Option } = Select;
const { TextArea } = Input;


const CustomerModal = ({ form, visible, confirmLoading = false, onSubmit, onClose, provinces = [] }) => {
    const [districts, setDistricts] = useState([]);
    const [subdistricts, setSubdistricts] = useState([]);
    const [isProvinceSelected, setIsProvinceSelected] = useState(false);
    const [isDistrictSelected, setIsDistrictSelected] = useState(false);
    const [isSubDistrictLoading, setIsSubDistrictLoading] = useState(false);
    const [isDistrictLoading, setIsDistrictLoading] = useState(false);

    let { t } = useTranslation();

    const onProvinceSelect = (value) => {
        setIsDistrictLoading(true);
        form.resetFields(['district', 'sub-district']);
        setIsProvinceSelected(false);
        setIsDistrictSelected(false);
        if (value != null) {
            addressApi.getDistrict(value).then(response => {
                setDistricts(response.data.data);
                setIsDistrictLoading(false);
                setIsProvinceSelected(true);
            }).catch(err => {
                console.error(err);
                message.error("Invalid Province");
            });
        }
    }

    const onDistrictSelect = (value) => {
        setIsSubDistrictLoading(true);
        form.resetFields(['sub-district']);
        setIsDistrictSelected(false);
        let province = form.getFieldValue('province')
        console.log(province);
        if (value != null) {
            addressApi.getSubdistrict(province, value).then(response => {
                setSubdistricts(response.data.data);
                setIsDistrictSelected(true);
                setIsSubDistrictLoading(false);
            }).catch(err => {
                console.error(err);
                message.error("Invalid District");
            });
        }
    }

    const handleOk = () => {
        form
            .validateFields()
            .then(onSubmit);
        setIsProvinceSelected(false);
        setIsDistrictSelected(false);
        setIsSubDistrictLoading(false);
        setIsDistrictLoading(false);
    }

    const handleCancel = () => {
        onClose()
        setIsProvinceSelected(false);
        setIsDistrictSelected(false);
        setIsSubDistrictLoading(false);
        setIsDistrictLoading(false);
        form.resetFields();
    }

    return (<Modal
        centered
        destroyOnClose
        title={t('common:create_title', { text: t('customer:title') })}
        okText={t('common:submit_button')}
        cancelText={t('common:cancel_button')}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={860}
    >
        <Row gutter={16}>
            <Col xs={24} sm={24} md={10}>
                <div style={{ marginBottom: "6px" }}>
                    {t('customer:form.image')}
                </div>
                <div style={{ width: "100%", textAlign: "center" }}>
                    <UploadBlock button={t('customer:form.image_upload_button')} />
                </div>
            </Col>
            <Col xs={24} sm={24} md={14}>
                <Form
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    layout="vertical"
                    size="small"
                    form={form}
                >
                    <Row gutter={16}>
                        <Col span="12">
                            <Form.Item
                                name="prefix"
                                label={t('customer:form.prefix')}
                                rules={[
                                    {
                                        required: true,
                                        message: t('validate:required', { text: t('customer:form.prefix') })
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="firstName"
                                label={t('customer:form.first_name')}
                                rules={[
                                    {
                                        required: true,
                                        message: t('validate:required', { text: t('customer:form.first_name') })
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span="12">
                            <Form.Item
                                name="lastName"
                                label={t('customer:form.last_name')}
                                rules={[
                                    {
                                        required: true,
                                        message: t('validate:required', { text: t('customer:form.last_name') })
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="phone"
                                label={t('customer:form.phone')}
                                rules={[
                                    {
                                        required: true,
                                        message: t('validate:required', { text: t('customer:form.phone') })
                                    },
                                    {
                                        type: 'number',
                                        message: t('validate:number', { text: t('customer:form.phone') })

                                    }
                                ]}
                            >
                                <Input placeholder="0123456789" maxLength={10} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span="12">
                            <Form.Item
                                name="province"
                                label={t('customer:form.province')}
                                rules={[
                                    {
                                        required: true,
                                        message: t('validate:required', { text: t('customer:form.province') })
                                    }
                                ]}
                            >
                                <Select
                                    placeholder={t('customer:form.select_default')}
                                    onChange={onProvinceSelect}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {provinces.map((item, index) =>
                                        <Option key={index} value={item.province}>{item.province}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="district"
                                label={t('customer:form.district')}
                                rules={[
                                    {
                                        required: true,
                                        message: t('validate:required', { text: t('customer:form.district') })
                                    }
                                ]}
                            >
                                <Select
                                    placeholder={t('customer:form.select_default')}
                                    onChange={onDistrictSelect}
                                    disabled={!isProvinceSelected}
                                    loading={isDistrictLoading}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {districts.map((item, index) =>
                                        <Option key={index} value={item}>{item}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span="12">
                            <Form.Item
                                name="sub-district"
                                label={t('customer:form.sub_district')}
                                rules={[
                                    {
                                        required: true,
                                        message: t('validate:required', { text: t('customer:form.sub_district') })
                                    }
                                ]}
                            >
                                <Select
                                    placeholder={t('customer:form.select_default')}
                                    disabled={!isDistrictSelected}
                                    loading={isSubDistrictLoading}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {subdistricts.map((item, index) =>
                                        <Option key={index} value={item}>{item}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="postcode"
                                label={t('customer:form.postcode')}
                                rules={[
                                    {
                                        required: true,
                                        message: t('validate:required', { text: t('customer:form.postcode') })
                                    },
                                    {
                                        type: 'number',
                                        message: t('validate:number', { text: t('customer:form.postcode') })
                                    }
                                ]}
                            >
                                <Input maxLength={5} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span="24">
                            <Form.Item
                                name="address"
                                label={t('customer:form.address')}
                            >
                                <TextArea
                                    autoSize={{ minRows: 3, maxRows: 6 }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    </Modal >);
}

export default CustomerModal;